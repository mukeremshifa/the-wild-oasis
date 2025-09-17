import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useCreateCabin } from './useCreateCabin';
import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';

const SubmissionRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1.2rem;
  padding-top: 1.2rem;
  padding-bottom: 0;
`;

function CreateCabinForm({ onCloseModal }) {
  const { register, handleSubmit, reset, getValues, formState } = useForm();
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();

  function onSubmit(data) {
    createCabin(
      { ...data, image: data.image[0] },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  // function onError(errors) {
  //   // console.log(errors);
  // }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isCreating}
          {...register('name', { required: 'This field is required!' })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
          {...register('maxCapacity', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isCreating}
          {...register('regularPrice', {
            required: 'This field is required!',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required!',
            validate: value =>
              (value >= 0 && value <= getValues().regularPrice) ||
              'Please input a valid discount!',
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          disabled={isCreating}
          defaultValue=""
          {...register('description', { required: 'This field is required!' })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          disabled={isCreating}
          {...register('image', { required: 'This field is required!' })}
        />
      </FormRow>

      <SubmissionRow type="horizontal">
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isCreating}>Create new cabin</Button>
      </SubmissionRow>
    </Form>
  );
}

export default CreateCabinForm;
