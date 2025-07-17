package com.fsoft.relationapp.relationmanagerapi.controllers;

import com.fsoft.relationapp.relationmanagerapi.models.ClinicalData;
import com.fsoft.relationapp.relationmanagerapi.models.Patient;
import com.fsoft.relationapp.relationmanagerapi.repos.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/patients")
public class PatientController {

    @Autowired
    private PatientRepository patientRepository;

    @GetMapping
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Patient> getPatientById(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            return ResponseEntity.ok(patient.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Patient createPatient(@RequestBody Patient patient) {
        return patientRepository.save(patient);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable Long id, @RequestBody Patient patientDetails) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            Patient updatedPatient = patient.get();
            updatedPatient.setFirstname(patientDetails.getFirstname());
            updatedPatient.setLastname(patientDetails.getLastname());
            updatedPatient.setAge(patientDetails.getAge());
            return ResponseEntity.ok(patientRepository.save(updatedPatient));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePatient(@PathVariable Long id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            patientRepository.delete(patient.get());
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // Add method that receives a patient id and clinical data and save clinical data to database
    @PostMapping("/{id}/clinicaldata")
    public ResponseEntity<Patient> addClinicalData(@PathVariable Long id, @RequestBody ClinicalData clinicalData) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            Patient updatedPatient = patient.get();
            clinicalData.setPatient(updatedPatient);
            updatedPatient.getClinicalData().add(clinicalData);
            return ResponseEntity.ok(patientRepository.save(updatedPatient));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}