import { Avatar, Button } from "antd";
import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

import withRepoBasic from "../../components/with-repo-basic";
import {getlastUpDatedTime} from '../../lib/utils'

const MDRenderer = dynamic(() => import("../../components/MarkdownRenderer"));

import api from "../../lib/api";

function IssueDetail({ issue }) {
  return (
    <div className="root">
      <MDRenderer content={issue.body} />
      <div className="action">
        <Button href={issue.html_url} target="_blank">
          打开Issue讨论页面
        </Button>
      </div>
      <style jsx>{`
        .root {
          background: #f1f1f1;
          padding: 20px;
        }
        .action {
          text-align: right;
        }
      `}</style>
    </div>
  );
}

function IssueItem({ issue }) {
  const [showDetail, setShowDetail] = useState(false);

  const toogleShowDetail = useCallback(() => {
    //逃避闭包
    setShowDetail(detail => !detail);
  }, []);
  return (
    <div>
      <div className="issue">
        <Button
          type="primary"
          size="small"
          style={{ position: "absolute", right: 10, top: 10 }}
          onClick={toogleShowDetail}
        >
          查看
        </Button>
        <div className="avatar">
          <Avatar src={issue.user.avatar_url} shape="square" size={50} />
        </div>
        <div className="main-info">
          <h6>
            <span>{issue.title}</span>
          </h6>
          <p className="sub-info">
            <span>Update at {getlastUpDatedTime(issue.updated_at)}</span>
          </p>
        </div>
        <style jsx>{`
        .issue {
          display: flex;
          position: relative;
          padding: 10px;
        }
        .issue:hover {
          background: #fafafa;
        }
        .issue + .issue {
          border-top: 1px solid #eee;
        }
        .main-info > h6 {
          max-width: 600px;
          font-size: 16px;
          padding-right: 40px;
        }
        .avatar {
          margin-right: 20px;
        }
        .sub-info > span + span {
          display: inline-block;
          margin-right: 20px;
          font-size: 12px;
        }
      `}</style>
      </div>
      { showDetail ? <IssueDetail issue={issue} /> : null }
    </div>
  );
}

const Issues = ({ issues }) => {
  console.log(issues);
  return (
    <div className="root">
      <div className="issues">
        {issues.map(issue => (
          <IssueItem issue={issue} key={issue.id} />
        ))}
      </div>
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};
Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;
  const issuesResp = await api.request(
    {
      url: `/repos/${owner}/${name}/issues`
    },
    ctx.req,
    ctx.res
  );

  return {
    issues: issuesResp.data
  };
};

export default withRepoBasic(Issues, "issues");
