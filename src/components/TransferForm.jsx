import { ethers } from 'ethers'
import ERC20_ABI from '../abis/ERC20.json'

function TransferForm({ token, receiver, setReceiver, amount, setAmount, setTxHash }) {
  const sendToken = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const tokenContract = new ethers.Contract(token.address, ERC20_ABI, signer)

      const value = ethers.parseUnits(amount, token.decimals)
      const tx = await tokenContract.transfer(receiver, value)

      setTxHash(tx.hash)
      await tx.wait()
      alert('✅ Gửi token thành công!')
    } catch (err) {
      console.error(err)
      alert('❌ Lỗi gửi token!')
    }
  }

  return (
    <>
      <input
        placeholder="Địa chỉ ví nhận"
        className="border p-2 w-full rounded"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        placeholder="Số lượng"
        className="border p-2 w-full rounded"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={sendToken}
      >
        Gửi token
      </button>
    </>
  )
}

export default TransferForm
