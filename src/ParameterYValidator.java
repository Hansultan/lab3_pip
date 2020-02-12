import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

public class ParameterYValidator implements Validator {

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object value) throws ValidatorException {
        try {
            double parsedValue = Double.parseDouble(value.toString());
            if (!(parsedValue > -3 && parsedValue < 3)) {
                FacesMessage message = new FacesMessage("Введено некорректное значение Y", "Y должен входить в диапазон (-3 ... 3)");
                throw new ValidatorException(message);
            }
        } catch (NumberFormatException e) {
            FacesMessage message = new FacesMessage("Введено некорректное значение Y", "Y должен быть числом");
            throw new ValidatorException(message);
        }
    }

}