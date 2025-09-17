import supabase, { supabaseUrl } from './supabase';

export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.log(error);
    throw new Error('Cabins could not be loaded!');
  }

  return data;
}

export async function deleteCabin(id) {
  const { error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be deleted!');
  }
}

export async function createCabin(newCabin, id) {
  const hasImagaPath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replace('/', '');

  const imagePath = hasImagaPath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images//${imageName}`;

  //https://hvypioacspohpcjdedsl.supabase.co/storage/v1/object/public/cabin-images//cabin-001.jpg

  // 1. crate/edit cabin
  let query = supabase.from('cabins');

  // A. create cabin
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B. edit cabin
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error('Cabin could not be added!');
  }

  // 2. upload image
  if (hasImagaPath) return data;

  const { error: storageError } = await supabase.storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);

  // 3. delete the cabin if the is an error uploading image
  if (storageError) await supabase.from('cabins').delete().eq('id', data.id);

  return data;
}
