package lewocz.estorebackend.service;

import lewocz.estorebackend.exception.DuplicateException;
import lewocz.estorebackend.model.User;
import lewocz.estorebackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new DuplicateException("User with email " + user.getEmail() + " already exists");
        }

        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setAddress(user.getAddress());
        newUser.setCity(user.getCity());
        newUser.setState(user.getState());
        newUser.setPin(user.getPin());

        userRepository.save(newUser);
    }
}
