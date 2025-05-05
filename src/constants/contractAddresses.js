export const CONTRACT_ADDRESSES =
  import.meta.env.VITE_NETWORK == 'sepolia'
    ? {
        MyToken: import.meta.env.VITE_SEPOLIA_MYTOKEN_ADDRESS,
        NewToken: import.meta.env.VITE_SEPOLIA_NEWTOKEN_ADDRESS
      }
    : {
        MyToken: import.meta.env.VITE_MYTOKEN_ADDRESS,
        NewToken: import.meta.env.VITE_NEWTOKEN_ADDRESS
      };
