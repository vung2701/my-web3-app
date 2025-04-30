Nếu chưa có project, tạo mới bằng Vite:
npm create vite@latest my-web3-app --template react
cd my-web3-app
npm install

Cài ethers.js:
npm install ethers

Cài thêm Material UI (nếu bạn thích UI đẹp nhanh):
npm install @mui/material @emotion/react @emotion/styled

node scripts/export-abi.js

Hàm Ý nghĩa
window.ethereum.request({ method: 'eth_requestAccounts' }) Yêu cầu user mở Metamask để connect ví.
window.ethereum.request({ method: 'eth_accounts' }) Lấy danh sách account đã kết nối (nếu có).
window.ethereum.on('accountsChanged', callback) Theo dõi nếu user đổi tài khoản.
window.ethereum.on('chainChanged', callback) Theo dõi nếu user đổi network (Mainnet ↔ Testnet).

Thành phần ethers 6
Provider Metamask new ethers.BrowserProvider(window.ethereum)
Gọi hàm contract contract.functionName()
Format ETH ethers.formatEther(value)
Format token ethers.formatUnits(value, decimals)
