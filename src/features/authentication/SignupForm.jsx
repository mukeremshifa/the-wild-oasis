import { useForm } from 'react-hook-form';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SubmissionRow from '../../ui/SubmissionRow';
import { useSignup } from './useSignup';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      {
        fullName,
        email,
        password,
      },
      { onSettled: reset }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register('fullName', { required: 'This field is required' })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Please enter a valid email address',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register('password', {
            required: 'This field is required',
            minLength: {
              value: 8,
              message: 'Password needs a minimum of 8 charaacters',
            },
          })}
          disabled={isLoading}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register('passwordConfirm', {
            required: 'This field is required',
            validate: value =>
              value === getValues().password || 'Passwords must match',
          })}
          disabled={isLoading}
        />
      </FormRow>

      <SubmissionRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </SubmissionRow>
    </Form>
  );
}

export default SignupForm;
