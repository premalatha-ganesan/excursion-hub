package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.UserSettings;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserSettingsRepository extends CrudRepository<UserSettings, Integer> {
}
