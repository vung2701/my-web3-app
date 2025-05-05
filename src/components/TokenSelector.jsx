import { Select, Button } from "antd";
import { ethers, formatUnits } from "ethers";

function TokenSelector({ tokens, token, setToken, balance, tokenContract, signer, initData, setLoading }) {
  const getToken = async () => {
    setLoading(true);
    try {
      if (!tokenContract || !signer) {
        throw new Error('Token contract or signer not initialized');
      }
      const userAddress = await signer.getAddress();
      const balanceRaw = await tokenContract.balanceOf(userAddress);
      console.log('Raw balanceOf response:', balanceRaw);

      const balance = ethers.formatUnits(balanceRaw, token.decimals);
      if (balanceRaw >= ethers.parseUnits('200', token.decimals)) {
        console.log('Balance sufficient, skipping mint');
        return;
      }

      const tx = await tokenContract.mint(userAddress, ethers.parseUnits('100', token.decimals));
      await tx.wait();
      await initData(); // Refresh balance after minting
      alert('✅ Nhận token thành công!');
  
    } catch (err) {
      console.error('Error in getToken:', err);
    }
    finally {
      setLoading(false);
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
          <p className="helpText">Số dư nhỏ hơn 200 có thể nhận để test, <br /> Lưu ý: ví test sepolia cần 1 chút ETH phí</p>
        </div>
      </div>
    </div>
  )
}

export default TokenSelector
