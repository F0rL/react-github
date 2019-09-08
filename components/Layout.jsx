import { useState, useCallback } from "react";
import { Icon, Input, Layout, Avatar, Tooltip, Dropdown, Menu } from "antd";
import { connect } from "react-redux";
const { Header, Content, Footer } = Layout;
import Container from "./Container";

import getConfig from "next/config";
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

const githubIconStyle = {
  color: "#fff",
  fontSize: 40,
  display: "block",
  paddingTop: 10,
  marginRight: 20
};
const footerStyle = {
  textAlign: "center"
};
// const Comp = ({color, children, style}) => <div style={{color, ...style}}>{children}</div>

const MyLayout = ({ children, user }) => {
  const [search, setSearch] = useState("");

  const handleSearchValue = useCallback(event => {
    setSearch(event.target.value);
  }, []);

  const handleOnSearch = useCallback(() => {}, []);

  // const userMenu = (
  //   <Menu>
  //     <Menu.Item>登出</Menu.Item>
  //   </Menu>
  // );

  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner"></div>}>
          <div className="header-left">
            <div className="header-logo">
              <Icon type="github" style={githubIconStyle} />
            </div>
            <div>
              <Input.Search
                placeholder="搜索仓库"
                value={search}
                onChange={handleSearchValue}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className="header-right">
            <div className="user-logo">
              {user && user.id ? (
                <Avatar size={40} src={user.avatar_url} />
              ) : (
                <Tooltip title="点击进行登录">
                  <a href={publicRuntimeConfig.OAUTH_URL}>
                    <Avatar size={40} icon="user" />
                  </a>
                </Tooltip>
              )}
            </div>
          </div>
        </Container>
      </Header>
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer style={footerStyle}>
        Develop by F0rl @ <a href="#">github.F0rl</a>
      </Footer>
      <style jsx>
        {`
          .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .header-left {
            display: flex;
            justify-content: flex-start;
          }
        `}
      </style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
      `}</style>
    </Layout>
  );
}

const mapState = state => {
  return {
    user: state.USER
  };
};

export default connect(mapState)(MyLayout);
