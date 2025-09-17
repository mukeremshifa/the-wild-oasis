import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { createCabin as createCabinApi } from '../../services/apiCabins';

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cabins'] });

      toast.success('New cabin successfully created!');
    },

    onError: err => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
