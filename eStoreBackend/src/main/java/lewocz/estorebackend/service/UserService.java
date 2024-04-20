package lewocz.estorebackend.service;

import lewocz.estorebackend.model.User;

public interface UserService {
    void registerUser(User user);
    User getUserByEmail(String email);
}
