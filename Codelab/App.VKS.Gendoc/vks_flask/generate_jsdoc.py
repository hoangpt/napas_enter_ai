#!/usr/bin/env python3
"""
VKS Flask API - JSDoc-style Documentation Generator
Tự động generate tài liệu cho Python functions theo format JSDoc
"""

import os
import ast
import inspect
import importlib.util
from typing import List, Dict, Any
import json

class JSDocGenerator:
    """Generator để tạo JSDoc-style documentation cho Python code"""
    
    def __init__(self, services_dir: str = "services"):
        self.services_dir = services_dir
        self.docs = {}
    
    def extract_function_info(self, node: ast.FunctionDef, class_name: str = None) -> Dict[str, Any]:
        """
        Extract thông tin từ AST node của function
        
        @param {ast.FunctionDef} node - AST node của function
        @param {str|None} class_name - Tên class chứa function (nếu có)
        @returns {Dict[str, Any]} Thông tin function đã extract
        """
        func_info = {
            "name": node.name,
            "class": class_name,
            "docstring": ast.get_docstring(node),
            "args": [],
            "decorators": [],
            "returns": None,
            "line_number": node.lineno
        }
        
        # Extract decorators
        for decorator in node.decorator_list:
            if isinstance(decorator, ast.Name):
                func_info["decorators"].append(decorator.id)
            elif isinstance(decorator, ast.Attribute):
                func_info["decorators"].append(f"{decorator.value.id}.{decorator.attr}")
        
        # Extract arguments
        for arg in node.args.args:
            arg_info = {
                "name": arg.arg,
                "type": None,
                "default": None
            }
            
            # Check for type annotation
            if arg.annotation:
                if isinstance(arg.annotation, ast.Name):
                    arg_info["type"] = arg.annotation.id
                elif isinstance(arg.annotation, ast.Constant):
                    arg_info["type"] = str(arg.annotation.value)
            
            func_info["args"].append(arg_info)
        
        # Extract defaults
        if node.args.defaults:
            num_defaults = len(node.args.defaults)
            num_args = len(func_info["args"])
            for i, default in enumerate(node.args.defaults):
                arg_index = num_args - num_defaults + i
                if isinstance(default, ast.Constant):
                    func_info["args"][arg_index]["default"] = default.value
                elif isinstance(default, ast.Name):
                    func_info["args"][arg_index]["default"] = default.id
        
        return func_info
    
    def parse_service_file(self, file_path: str) -> Dict[str, Any]:
        """
        Parse một service file và extract thông tin functions
        
        @param {str} file_path - Đường dẫn đến service file
        @returns {Dict[str, Any]} Thông tin service đã parse
        """
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        tree = ast.parse(content)
        service_info = {
            "file": os.path.basename(file_path),
            "classes": {},
            "functions": []
        }
        
        for node in ast.walk(tree):
            if isinstance(node, ast.ClassDef):
                class_info = {
                    "name": node.name,
                    "docstring": ast.get_docstring(node),
                    "methods": []
                }
                
                # Extract methods
                for item in node.body:
                    if isinstance(item, ast.FunctionDef):
                        func_info = self.extract_function_info(item, node.name)
                        class_info["methods"].append(func_info)
                
                service_info["classes"][node.name] = class_info
            
            elif isinstance(node, ast.FunctionDef):
                # Top-level functions
                func_info = self.extract_function_info(node)
                service_info["functions"].append(func_info)
        
        return service_info
    
    def generate_jsdoc_comment(self, func_info: Dict[str, Any]) -> str:
        """
        Generate JSDoc-style comment cho một function
        
        @param {Dict[str, Any]} func_info - Thông tin function
        @returns {str} JSDoc comment string
        """
        lines = ["/**"]
        
        # Description từ docstring
        if func_info["docstring"]:
            desc_lines = func_info["docstring"].strip().split('\n')
            lines.append(f" * {desc_lines[0]}")
            if len(desc_lines) > 1:
                lines.append(" *")
                for line in desc_lines[1:]:
                    lines.append(f" * {line.strip()}")
        else:
            lines.append(f" * {func_info['name']} method")
        
        lines.append(" *")
        
        # Parameters
        for arg in func_info["args"]:
            if arg["name"] == "self":
                continue
                
            param_type = arg["type"] or "Any"
            param_name = arg["name"]
            
            if arg["default"] is not None:
                param_line = f" * @param {{{param_type}}} [{param_name}={arg['default']}]"
            else:
                param_line = f" * @param {{{param_type}}} {param_name}"
            
            lines.append(param_line)
        
        # Return type
        if "staticmethod" in func_info["decorators"]:
            lines.append(" * @static")
        
        # Determine return type based on function name patterns
        return_type = self.guess_return_type(func_info)
        lines.append(f" * @returns {{{return_type}}}")
        
        # Exceptions (common patterns)
        if func_info["name"] in ["create", "update", "delete"]:
            lines.append(" * @throws {ValueError} Validation errors")
            lines.append(" * @throws {SQLAlchemyError} Database errors")
        
        lines.append(" */")
        return "\n".join(lines)
    
    def guess_return_type(self, func_info: Dict[str, Any]) -> str:
        """
        Đoán return type dựa trên tên function và patterns
        
        @param {Dict[str, Any]} func_info - Thông tin function
        @returns {str} Return type string
        """
        name = func_info["name"]
        
        if name.startswith("get_all"):
            return "List[Object]"
        elif name.startswith("get_by"):
            return "Object|None"
        elif name == "create":
            return "Object"
        elif name == "update":
            return "Object|None"
        elif name == "delete":
            return "boolean"
        elif name.startswith("search"):
            return "List[Object]"
        elif name == "validate_image":
            return "Tuple[boolean, string]"
        elif name == "extract_legal_document_info":
            return "Dict[str, Any]"
        elif name == "process_extracted_data":
            return "Dict[str, Any]"
        else:
            return "Any"
    
    def generate_service_docs(self, service_info: Dict[str, Any]) -> str:
        """
        Generate documentation cho một service file
        
        @param {Dict[str, Any]} service_info - Thông tin service
        @returns {str} Documentation string
        """
        lines = []
        lines.append(f"// {service_info['file']} - Auto-generated JSDoc Documentation")
        lines.append("// Generated by VKS JSDoc Generator")
        lines.append("")
        
        # Classes
        for class_name, class_info in service_info["classes"].items():
            lines.append(f"/**")
            if class_info["docstring"]:
                lines.append(f" * {class_info['docstring']}")
            else:
                lines.append(f" * {class_name} service class")
            lines.append(f" * @class {class_name}")
            lines.append(f" */")
            lines.append(f"class {class_name} {{")
            lines.append("")
            
            # Methods
            for method in class_info["methods"]:
                jsdoc = self.generate_jsdoc_comment(method)
                lines.append("    " + jsdoc.replace("\n", "\n    "))
                
                # Method signature
                args_str = ", ".join([
                    f"{arg['name']}" + (f"={arg['default']}" if arg['default'] is not None else "")
                    for arg in method["args"]
                ])
                lines.append(f"    {method['name']}({args_str}) {{")
                lines.append("        // Implementation...")
                lines.append("    }")
                lines.append("")
            
            lines.append("}")
            lines.append("")
        
        # Top-level functions
        for func in service_info["functions"]:
            jsdoc = self.generate_jsdoc_comment(func)
            lines.append(jsdoc)
            
            args_str = ", ".join([
                f"{arg['name']}" + (f"={arg['default']}" if arg['default'] is not None else "")
                for arg in func["args"]
            ])
            lines.append(f"function {func['name']}({args_str}) {{")
            lines.append("    // Implementation...")
            lines.append("}")
            lines.append("")
        
        return "\n".join(lines)
    
    def generate_all_docs(self) -> Dict[str, str]:
        """
        Generate documentation cho tất cả service files
        
        @returns {Dict[str, str]} Dictionary với key là tên file, value là documentation
        """
        all_docs = {}
        
        # Scan services directory
        for filename in os.listdir(self.services_dir):
            if filename.endswith('.py') and filename != '__init__.py':
                file_path = os.path.join(self.services_dir, filename)
                try:
                    service_info = self.parse_service_file(file_path)
                    docs = self.generate_service_docs(service_info)
                    all_docs[filename] = docs
                except Exception as e:
                    print(f"Error processing {filename}: {e}")
        
        return all_docs
    
    def save_docs_to_file(self, docs: Dict[str, str], output_dir: str = "docs/jsdoc"):
        """
        Lưu documentation vào files
        
        @param {Dict[str, str]} docs - Documentation dictionary
        @param {str} output_dir - Thư mục output
        """
        os.makedirs(output_dir, exist_ok=True)
        
        for filename, content in docs.items():
            output_file = os.path.join(output_dir, f"{filename}.jsdoc.js")
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"✓ Generated: {output_file}")
    
    def generate_markdown_index(self, docs: Dict[str, str], output_file: str = "docs/JSDOC_INDEX.md"):
        """
        Generate markdown index file
        
        @param {Dict[str, str]} docs - Documentation dictionary  
        @param {str} output_file - Output markdown file
        """
        lines = []
        lines.append("# VKS Flask API - JSDoc Documentation")
        lines.append("")
        lines.append("Auto-generated JSDoc-style documentation for all services.")
        lines.append("")
        lines.append("## Services")
        lines.append("")
        
        for filename in sorted(docs.keys()):
            service_name = filename.replace('.py', '')
            lines.append(f"- [{service_name}](jsdoc/{filename}.jsdoc.js)")
        
        lines.append("")
        lines.append("## Usage")
        lines.append("")
        lines.append("```javascript")
        lines.append("// Example JSDoc annotations:")
        lines.append("/**")
        lines.append(" * Create new nguyen don")
        lines.append(" * @param {Dict[str, Any]} data - Nguyen don data")
        lines.append(" * @returns {Object} Created nguyen don object")
        lines.append(" * @throws {ValueError} Validation errors")
        lines.append(" * @static")
        lines.append(" */")
        lines.append("```")
        
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write("\n".join(lines))
        print(f"✓ Generated index: {output_file}")


def main():
    """
    Main function để chạy JSDoc generator
    """
    print("🚀 VKS JSDoc Documentation Generator")
    print("====================================")
    
    generator = JSDocGenerator()
    
    # Generate docs for all services
    print("\n📚 Generating JSDoc documentation...")
    docs = generator.generate_all_docs()
    
    # Save to files
    print("\n💾 Saving documentation files...")
    generator.save_docs_to_file(docs)
    
    # Generate index
    print("\n📋 Generating index file...")
    generator.generate_markdown_index(docs)
    
    print(f"\n✅ Generated documentation for {len(docs)} services:")
    for filename in docs.keys():
        print(f"   - {filename}")
    
    print(f"\n📖 Documentation saved to:")
    print(f"   - docs/jsdoc/*.jsdoc.js")
    print(f"   - docs/JSDOC_INDEX.md")


if __name__ == "__main__":
    main()
