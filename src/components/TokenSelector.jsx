import { Select, Button } from "antd";
import { ethers } from "ethers";

function TokenSelector({ tokens, token, setToken, balance, tokenContract, signer }) {
  const getToken = async () => {
    try {
      const tx = await tokenContract.mint(signer.getAddress(), ethers.parseUnits("100", token.decimals))
      await tx.wait()
      alert('✅ Nhận token thành công!')
    } catch (err) {
      console.error(err)
      alert('❌ Lỗi nhận token!')
    }
  }
  return (
    <div className="toolBar">
      <div className="selectToken ">
        <label>Chọn token:</label>
        <Select
          defaultValue={token.symbol}
          style={{ width: 150 }}
          value={token.symbol}
          options={tokens.map((t) => {
            return { label: `${t.name} - ${t.symbol}`, value: t.symbol }
          })}
          placeholder="Chọn token"
          onChange={(value) => {
            setToken(tokens.find((t) => t.symbol == value))
          }}
          />
      </div>
      <div className="tokenBalance">
        <div className="balanceInfor">
          <label>Số dư hiện tại: </label>
          <span>{balance} {token.symbol}</span>
        </div>
        <div className="getToken">
          <Button size="medium" style={{ backgroundColor: 'green', color: 'white', border: 'none' }}
            onClick={getToken}>Nhận Token</Button>
        </div>
      </div>
    </div>
  )
}

export default TokenSelector
