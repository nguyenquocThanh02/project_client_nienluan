import { Layout } from 'antd';

const { Footer } = Layout;

function FooterComponent() {
  return (
    <Layout >
      <Footer style={{ textAlign: 'center', background: 'black', color: '#fff' }}>
        © {new Date().getFullYear()} bản quyền thuộc về <i>nguyenquocthanh</i>.
      </Footer>
    </Layout>
  );
}

export default FooterComponent;