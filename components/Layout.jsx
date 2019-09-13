import { useState, useCallback } from "react";
import Link from "next/link";
import { Icon, Input, Layout, Avatar, Tooltip, Dropdown, Menu } from "antd";
import { connect } from "react-redux";
import axios from "axios";
import { withRouter, Router } from "next/router";
import { userLogout } from "../store";

const { Header, Content, Footer } = Layout;
import Container from "./Container";

import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

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

const MyLayout = ({ children, user, logout, router }) => {
  const urlQuery = router.query && router.query.query;
  const [search, setSearch] = useState(urlQuery || "");

  const handleSearchValue = useCallback(event => {
    setSearch(event.target.value);
  }, []);

  const handleOnSearch = useCallback(() => {
    router.push(`/search?query=${search}`);
  }, [search]);

  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  const handleGotoAuth = useCallback(e => {
    e.preventDefault();
    axios
      .get(`/prepare-auth?url=${router.asPath}`)
      .then(resp => {
        if (resp.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        } else {
          console.log("prepare auth failed", resp);
        }
      })
      .catch(err => {
        console.log("prepare auth failed", err);
      });
  }, []);
  return (
    <Layout>
      <Header>
        <Container renderer={<div className="header-inner"></div>}>
          <div className="header-left">
            <div className="header-logo">
              <Link href="/">
                <a>
                  <Icon type="github" style={githubIconStyle} />
                </a>
              </Link>
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
                <Tooltip title="点击登出">
                  <a onClick={handleLogout}>
                    <Avatar size={40} src={user.avatar_url} />
                  </a>
                </Tooltip>
              ) : (
                <Tooltip title="点击登录">
                  <a href={`/prepare-auth?url=${router.asPath}`}>
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
          min-height: 100%;
        }
        .ant-layout-header {
          padding-left: 0;
          padding-right: 0;
        }
        .ant-layout-content {
          background: #fff;
        }
      `}</style>
    </Layout>
  );
};

const mapState = state => {
  return {
    user: state.USER
  };
};
const mapReducer = dispatch => {
  return {
    logout() {
      dispatch(userLogout());
    }
  };
};

export default connect(
  mapState,
  mapReducer
)(withRouter(MyLayout));
