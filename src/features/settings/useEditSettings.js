import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateSetting } from '../../services/apiSettings';
import toast from 'react-hot-toast';

export function useEditSettings() {
  const queryClient = useQueryClient();

  const { mutate: editSettings, isLoading: isEditing } = useMutation({
    mutationFn: newSettingData => updateSetting(newSettingData),
    onSuccess: () => {
      toast.success('Setting successfully updated');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    },
    onError: err => toast.error(err.message),
  });

  return { isEditing, editSettings };
}
