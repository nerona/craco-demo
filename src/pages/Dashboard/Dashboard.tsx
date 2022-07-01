import React from 'react';
import { Skeleton } from 'antd';

export const Dashboard: React.FC<{}> = React.memo(() => {
  return <Skeleton active></Skeleton>;
});
