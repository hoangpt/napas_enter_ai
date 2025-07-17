package com.fsoft.relationapp.relationmanagerapi.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fsoft.relationapp.relationmanagerapi.models.Patient;


@Repository
public interface PatientRepository extends JpaRepository<Patient, Long> {
}