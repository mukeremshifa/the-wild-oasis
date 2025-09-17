import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    mutationFn: ({ newCabinData, id }) => createCabin(newCabinData, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });

      toast.success('Cabin successfully edited');
    },
    onError: err => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
