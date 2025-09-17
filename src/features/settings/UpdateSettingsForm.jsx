import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from '../../ui/Spinner';
import { useEditSettings } from './useEditSettings';

function UpdateSettingsForm() {
  const {
    isLoading,
    settings: {
      minBookingLength,
      maxBookingLength,
      breakfastPrice,
      maxGuestsPerBooking,
    } = {},
  } = useSettings();

  const { isEditing, editSettings } = useEditSettings();

  function handleUpdate(e, field) {
    const { value } = e.target;

    if (!value) return;

    editSettings({ [field]: value });
  }

  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isEditing}
          onBlur={e => handleUpdate(e, 'minBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isEditing}
          onBlur={e => handleUpdate(e, 'maxBookingLength')}
        />
      </FormRow>

      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isEditing}
          onBlur={e => handleUpdate(e, 'maxGuestsPerBooking')}
        />
      </FormRow>

      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isEditing}
          onBlur={e => handleUpdate(e, 'breakfastPrice')}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
