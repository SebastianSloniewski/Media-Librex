package pl.ziwg.medialibrex.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserGetDTO
{
    @NotEmpty
    private Long id;

    @NotEmpty
    private String name;

    @NotEmpty
    @Email
    private String email;
}
