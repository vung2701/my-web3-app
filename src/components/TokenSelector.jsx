import { Select, Button } from "antd";
import { ethers } from "ethers";

function TokenSelector({ tokens, token, setToken, balance, tokenContract, signer }) {
  const getToken = async () => {
    try {
      if (!tokenContract || !signer) {
        throw new Error('Token contract or signer not initialized');
      }
      const userAddress = await signer.getAddress();
      const balance = await tokenContract.balanceOf(userAddress);
      if (balance >= ethers.parseUnits("200", token.decimals)) {
        return;
      }
      const tx = await tokenContract.mint(
        userAddress,
        ethers.parseUnits("100", token.decimals)
      );
      await tx.wait();
      alert('✅ Nhận token thành công!');
    } catch (err) {
      console.error('Error in getToken:', err);
    }
  };
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
