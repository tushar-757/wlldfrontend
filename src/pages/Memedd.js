import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Skeleton,
  Form,
  Checkbox,
  AutoComplete,
  Spin,
  Button,
  Space,
  Image,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { failureNotifier } from '../utils/notifications';
import {
  updateAdminHandler,
  deleteAdminHandler,
} from '../utils/HandlerFunctions/AdminHandler';
import {
  setMemedd,
  getMemeddSuccess,
  addMemedd,
} from '../Actions/MemerActions';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';

export default function Memedd() {
  const memerData = useSelector(state => state.MemerReducer.memedd);
  const selectedMemer = useSelector(state => state.MemerReducer.selectedMemedd);
  const isLoading = useSelector(state => state.MemerReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [AdminName, setAdminName] = useState(selectedMemer?.username);
  const [AdminEmail, setAdminEmail] = useState(selectedMemer?.email);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [Name, setName] = useState('');
  const [SearchData, setSearchData] = useState([]);
  const navigate = useNavigate();
  const [status, setStatus] = useState({
    bool1: false,
    bool2: false,
  });

  const columns = [
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.picture} />
        </Space>
      ),
      width: '5%',
    },
    {
      title: 'Username',
      dataIndex: 'firstName',
      key: 'firstName',
      render: (text, record) => (
        <Space size="middle">
          <span>
            {record?.firstName} {record?.lastName}
          </span>
        </Space>
      ),
    },
    {
      title: 'Name',
      dataIndex: 'memeddName',
      key: 'memeddName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone No.',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Last Used',
      dataIndex: 'lastUsedAppAt',
      key: 'lastUsedAppAt',
      render: (text, record) => (
        <span>{moment(record?.lastUsedAppAt).format('DD/MMM/YYYY')}</span>
      ),
    },
    {
      title: 'Brands',
      key: 'action',
      render: (text, record) => (
        <Space>
          <p
            onClick={() => {
              setIsModalVisible3(true);
              dispatch(setMemedd(record?._id));
            }}
          >
            <Icon icon="bi:info-circle-fill" width={20} />
          </p>
        </Space>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (text,record) => (
    //     <Space size="middle">
    //       <a onClick={()=>{
    //         dispatch(setAdmin(values1,record?._id))
    //          setIsModalVisible(true)
    //         }}><Icon icon="akar-icons:edit" width="20" /></a>
    //       <a onClick={()=>{
    //       setIsModalVisible1(true)
    //         dispatch(setAdmin(values1,record?._id))
    //         }}><Icon icon="ant-design:delete-filled" width="20" /></a>
    //     </Space>
    //   ),
    // },
  ];

  const columns1 = [
    {
      title: 'Logo',
      dataIndex: 'brandLogo',
      key: 'brandLogo',
      render: (text, record) => <Image src={record?.brandLogo} />,
      width: '15%',
    },
    {
      title: 'BrandName',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
  ];
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleOk2 = () => {
    setIsModalVisible3(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible3(false);
  };

  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      // console.log("not found")
      setData(memerData);
      setData1(memerData);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
    } else {
      setData(memerData);
    }
  }, [memerData, SearchData]);

  const dispatch = useDispatch();

  const handleChange = evt => {
    const value = evt;
    setName(value);
  };
  const onCheckChange1 = () => {
    setStatus({ bool1: true, bool2: false });
  };
  const onCheckChange2 = () => {
    setStatus({ bool1: false, bool2: true });
  };

  useEffect(() => {
    setAdminName(selectedMemer?.username);
    setAdminEmail(selectedMemer?.email);
    if (selectedMemer?.status) {
      setStatus({
        bool1: selectedMemer?.status,
        bool2: !selectedMemer?.status,
      });
    } else {
      setStatus({
        bool1: selectedMemer?.status,
        bool2: !selectedMemer?.status,
      });
    }
  }, [selectedMemer]);

  useEffect(() => {
    if (memerData?.length >= 0) {
      setData(memerData);
    }
  }, [memerData]);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'memedd',
      data,
      setData,
      setData1,
      dispatch,
      getMemeddSuccess,
      navigate
    );
  }, []);

  useEffect(() => {
    if (loading) {
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [loading]);

  return (
    <Page>
      <Container>
        <div
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <div style={{ width: '60%' }}>
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Memedd</h3>
          </div>
          <div
            style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'end',
            }}
          >
            <Input.Group style={{ display: 'contents' }}>
              <AutoComplete
                style={{ width: '100%', marginRight: '10px' }}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    SearchHandler(
                      setSearchData,
                      setLoading,
                      Name,
                      'memedd',
                      addMemedd,
                      dispatch,
                      navigate
                    );
                  }
                }}
                placeholder="find memedd..."
                name={Name}
                onChange={handleChange}
              />
              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'memedd',
                    addMemedd,
                    dispatch,
                    navigate
                  )
                }
                style={{
                  color: '#ffffff',
                  background: '#21c980',
                }}
              >
                Search
              </Button>
            </Input.Group>
          </div>
        </div>
        {isLoading ? (
          <div className="example">
            <Spin />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data.length}
            next={() =>
              loadMoreData(
                page,
                pageSize,
                setPage,
                loading,
                setLoading,
                'memedd',
                data,
                setData,
                setData1,
                dispatch,
                getMemeddSuccess,
                navigate
              )
            }
            hasMore={data1?.length > 0}
            loader={
              data?.length > 10 ? (
                <Skeleton avatar paragraph={{ rows: 1 }} active />
              ) : (
                ''
              )
            }
            scrollableTarget="scrollableDiv"
          >
            <Table columns={columns} dataSource={data} pagination={false} />
          </InfiniteScroll>
        )}
        <Modal
          title={`Edit ${selectedMemer?.username}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() =>
              updateAdminHandler(
                AdminName,
                AdminEmail,
                status.bool1,
                selectedMemer?._id
              )
            }
            autoComplete="off"
          >
            <Input
              value={AdminName}
              onChange={e => setAdminName(e.target.value)}
              required
            />
            <Input value={AdminEmail} required />
            <Checkbox checked={status.bool1} onChange={onCheckChange1}>
              Activate
            </Checkbox>
            <Checkbox checked={status.bool2} onChange={onCheckChange2}>
              Deactivate
            </Checkbox>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Modal>
        <Modal
          title={`delete ${selectedMemer?.username} `}
          visible={isModalVisible1}
          onOk={handleOk1}
          onCancel={handleCancel1}
          maskClosable={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => deleteAdminHandler(selectedMemer?._id)}
            autoComplete="off"
          >
            <Input value={AdminName} required />
            <Input value={AdminEmail} required />
            <Button type="danger" htmlType="submit">
              delete
            </Button>
          </Form>
        </Modal>
        <Modal
          title={`Brands`}
          visible={isModalVisible3}
          onOk={handleOk2}
          onCancel={handleCancel2}
          maskClosable={false}
          footer={null}
        >
          <Table
            columns={columns1}
            dataSource={selectedMemer?.Brands}
            pagination={false}
          />
        </Modal>
      </Container>
    </Page>
  );
}
