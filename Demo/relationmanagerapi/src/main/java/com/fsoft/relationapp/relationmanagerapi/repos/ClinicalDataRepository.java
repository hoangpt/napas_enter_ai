package com.fsoft.relationapp.relationmanagerapi.repos;

import com.fsoft.relationapp.relationmanagerapi.models.ClinicalData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ClinicalDataRepository extends JpaRepository<ClinicalData, Long> {
    // Add custom query methods if needed
}