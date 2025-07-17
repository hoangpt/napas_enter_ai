import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CaseList from '../index';
import { HoSoProvider } from '../../../providers/HoSoProvider';
import HoSoService from '../../../services/HoSoService';
import fixture from '../fixture';

// Mock the HoSoService
vi.mock('../../../services/HoSoService');

// Mock fixture data
const mockFixtureData = fixture;

// Test wrapper component
const TestWrapper = ({ children }) => (
  <BrowserRouter>
    <HoSoProvider>
      {children}
    </HoSoProvider>
  </BrowserRouter>
);

describe('CaseList Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state initially', () => {
    HoSoService.getHoSoList.mockImplementation(() => new Promise(() => {})); // Never resolves
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    expect(screen.getByText('Đang tải dữ liệu...')).toBeInTheDocument();
  });

  it('renders error state when API fails', async () => {
    HoSoService.getHoSoList.mockRejectedValue(new Error('API Error'));
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText(/Lỗi: API Error/)).toBeInTheDocument();
    });
  });

  it('renders case list successfully when data is loaded', async () => {
    HoSoService.getHoSoList.mockResolvedValue(mockFixtureData);
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Hệ Thống Quản Lý Hồ Sơ Vụ Án')).toBeInTheDocument();
    });

    // Check if table headers are rendered
    expect(screen.getByText('SỐ THỤ LÝ')).toBeInTheDocument();
    expect(screen.getByText('NGUYÊN ĐƠN')).toBeInTheDocument();
    expect(screen.getByText('BỊ ĐƠN')).toBeInTheDocument();
    expect(screen.getByText('NGÀY THỤ LÝ')).toBeInTheDocument();
    expect(screen.getByText('TÌNH TRẠNG')).toBeInTheDocument();
    expect(screen.getByText('THAO TÁC')).toBeInTheDocument();

    // Check if data rows are rendered
    expect(screen.getByText('155/TB-TLVA')).toBeInTheDocument();
    expect(screen.getByText('Ông Nguyễn Văn A')).toBeInTheDocument();
    expect(screen.getByText('Bà Trần Thị B')).toBeInTheDocument();
    expect(screen.getByText('15/05/2024')).toBeInTheDocument();
    expect(screen.getByText('Đang xử lý')).toBeInTheDocument();

    expect(screen.getByText('156/TB-TLVA')).toBeInTheDocument();
    expect(screen.getByText('Công ty Cổ phần X')).toBeInTheDocument();
    expect(screen.getByText('Công ty TNHH Y')).toBeInTheDocument();
    expect(screen.getByText('20/05/2024')).toBeInTheDocument();
    expect(screen.getByText('Đã hoàn tất')).toBeInTheDocument();
  });

  it('renders "Thêm vụ việc mới" button', async () => {
    HoSoService.getHoSoList.mockResolvedValue(mockFixtureData);
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Thêm vụ việc mới')).toBeInTheDocument();
    });

    const addButton = screen.getByText('Thêm vụ việc mới');
    expect(addButton.closest('a')).toHaveAttribute('href', '/upload');
  });

  it('renders "Xem chi tiết" links for each case', async () => {
    HoSoService.getHoSoList.mockResolvedValue(mockFixtureData);
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    await waitFor(() => {
      const detailLinks = screen.getAllByText('Xem chi tiết');
      expect(detailLinks).toHaveLength(2);
    });
  });

  it('applies correct CSS classes for status types', async () => {
    HoSoService.getHoSoList.mockResolvedValue(mockFixtureData);
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    await waitFor(() => {
      const processingStatus = screen.getByText('Đang xử lý');
      const doneStatus = screen.getByText('Đã hoàn tất');
      
      expect(processingStatus).toHaveClass('casel-status-processing');
      expect(doneStatus).toHaveClass('casel-status-done');
    });
  });

  it('handles empty data gracefully', async () => {
    HoSoService.getHoSoList.mockResolvedValue([]);
    
    render(
      <TestWrapper>
        <CaseList />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Hệ Thống Quản Lý Hồ Sơ Vụ Án')).toBeInTheDocument();
    });

    // Should still render headers but no data rows
    expect(screen.getByText('SỐ THỤ LÝ')).toBeInTheDocument();
    expect(screen.queryByText('155/TB-TLVA')).not.toBeInTheDocument();
    
    // Should display "no record" message
    expect(screen.getByText('Không có dữ liệu. Sử dụng button upload')).toBeInTheDocument();
  });
});
