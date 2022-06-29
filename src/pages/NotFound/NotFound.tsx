import { FC, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Result, Button } from 'antd';

const ContainerStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export const NotFound: FC<{}> = memo(() => {
  const navigate = useNavigate();

  return (
    <ContainerStyled>
      <Result
        status="404"
        title="404"
        subTitle="当前访问地址出错啦！"
        extra={
          <Button
            type="primary"
            onClick={() => {
              navigate('/');
            }}
          >
            返回首页
          </Button>
        }
      />
    </ContainerStyled>
  );
});

export default NotFound;
