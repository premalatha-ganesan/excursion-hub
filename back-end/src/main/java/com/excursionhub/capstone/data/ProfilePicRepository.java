package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.ProfilePic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfilePicRepository extends CrudRepository<ProfilePic, Integer> {
}
