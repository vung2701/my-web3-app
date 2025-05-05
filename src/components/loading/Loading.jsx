import { Spin } from 'antd';
import './loading.css';

export default function GlobalLoading({ loading }) {
  return loading ? (
    <div className="global-loading">
      <Spin size="large" tip="Đang xử lý giao dịch..." />
    </div>
  ) : null;
}
