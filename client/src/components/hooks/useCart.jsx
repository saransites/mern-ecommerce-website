// hooks/useCart.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { UseApi } from "../global/slice";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";

const useCart = () => {
  const api = UseApi();
  const queryClient = useQueryClient();
  const { _id: userId } = useSelector((state) => state?.data?.user || {});

  // Fetch cart data
  const { data: cart = [], isLoading, error } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      const response = await api.get(`/cart/${userId}`);
      return response.data;
    },
    onError: () => {
      toast.error("Failed to fetch cart items.");
    },
  });

  // Add item to cart
  const addCartMutation = useMutation({
    mutationFn: async (product) => {
      const { data } = await api.post(`/cart/${userId}`, product);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
      toast.success("Product added to cart successfully.");
    },
    onError: (error) => {
      if (error?.status === 409) {
        toast.error(error?.response?.data);
        return;
      }
      if (error?.status === 403) {
        toast.error(error?.response?.data);
        return;
      }
      console.log(error)
      toast.error("Error adding to cart. Please try again.");
    },
  });

  // Update item quantity
  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }) => {
      const response = await api.put(`/cart/${userId}/${id}`, { quantity });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
    },
    onError: () => {
      toast.error("Unable to update cart quantity.");
    },
  });

  // Remove item from cart
  const removeItemMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/cart/${userId}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", userId]);
      toast.success("Item removed from cart.");
    },
    onError: () => {
      toast.error("Unable to delete cart item.");
    },
  });

  return {
    cart,
    isLoading,
    error,
    addCart: addCartMutation.mutate,
    updateQuantity: updateQuantityMutation.mutate,
    removeItem: removeItemMutation.mutate,
  };
};

export default useCart;
