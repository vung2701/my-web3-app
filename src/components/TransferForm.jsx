import { ethers } from 'ethers'
import { Input, Button } from 'antd';

function TransferForm({ token, receiver, setReceiver, amount, setAmount, setTxHash, tokenContract }) {
  const sendToken = async () => {
    try {
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
    <form className="transferForm">
      <h4>Gửi Token:</h4>
       <Input size="large" placeholder="Địa chỉ ví nhận" value={receiver} onChange={(e) => setReceiver(e.target.value)}/>
      <Input size="large" placeholder="Số lượng" value={amount} onChange={(e) => setAmount(e.target.value)} />
       <Button size="large" type='primary' onClick={sendToken}>Gửi Token</Button>
    </form>
  )
}

export default TransferForm
