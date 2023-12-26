import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Form,
  Image,
  Skeleton,
  AutoComplete,
  Spin,
  Button,
  Space,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdminSuccess,
  addAdmin,
  closeVisible,
} from '../Actions/AdminActions';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import {
  registerAdminHandler,
  changePasswordHandler,
  deleteAdminHandler,
} from '../utils/HandlerFunctions/AdminHandler';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroll-component';

// importing our common search and load more data methods from utils
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';

export default function Admin() {
  const userData = useSelector(state => state.AdminReducer.users);
  const selectedAdmin = useSelector(state => state.AdminReducer.selectedAdmin);
  const visible = useSelector(state => state.AdminReducer.visible);
  const isLoading = useSelector(state => state.AdminReducer.loading);
  const [Visible, setVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [FirstName, setFirstName] = useState();
  const [LastName, setLastName] = useState();
  const [Email, setEmail] = useState();
  const [PhoneNo, setPhoneNo] = useState();
  const [Password, setPassword] = useState();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const [AdminName, setAdminName] = useState('');
  const [OldPassword, setOldPassword] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [ConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //table columns
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
      title: 'Admin Name',
      dataIndex: 'adminName',
      key: 'adminName',
      render: (text, record) => <span>{record?.adminName}</span>,
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      width: '10%',
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
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              setIsModalVisible3(true);
              // deleteAdminHandler(dispatch, record?.adminCode);
            }}
          >
            <Icon icon="ant-design:delete-filled" width="20" />
          </p>
        </Space>
      ),
    },
  ];

  //method section starts
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk3 = () => {
    setIsModalVisible3(false);
  };

  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };

  const handleChange = evt => {
    const value = evt;
    setName(value);
  };
  //method section ends

  //useEffect section starts
  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      // console.log("not found")
      setData(userData);
      setData1(userData);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
    } else {
      setData(userData);
    }
  }, [userData, SearchData]);

  useEffect(() => {
    if (selectedAdmin) {
      setFirstName(selectedAdmin?.firstName);
      setLastName(selectedAdmin?.lastName);
      setEmail(selectedAdmin?.email);
      setPhoneNo(selectedAdmin?.phoneNo);
    }
  }, [selectedAdmin]);

  useEffect(() => {
    if (userData?.length >= 0) {
      setData(userData);
    }
  }, [userData]);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'admin',
      data,
      setData,
      setData1,
      dispatch,
      getAdminSuccess,
      navigate
    );
  }, []);

  useEffect(() => {
    setVisible(visible);
  }, [visible]);
  //useEffect section ends

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
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Admin</h3>
          </div>
          <div
            style={{
              width: '40%',
              display: 'flex',
              justifyContent: 'center',
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
                      'admin',
                      addAdmin,
                      dispatch,
                      navigate
                    );
                  }
                }}
                placeholder="find admin..."
                name={Name}
                onChange={handleChange}
              />

              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'admin',
                    addAdmin,
                    dispatch,
                    navigate
                  )
                }
                style={{
                  color: '#ffffff',
                  background: '#21c980',
                  marginRight: '10px',
                }}
              >
                Search
              </Button>
            </Input.Group>
            <Button onClick={() => setIsModalVisible(true)}>+</Button>
          </div>
        </div>
        {isLoading ? (
          <div className="example">
            <Spin />
          </div>
        ) : (
          <InfiniteScroll
            dataLength={data?.length}
            next={() =>
              loadMoreData(
                page,
                pageSize,
                setPage,
                loading,
                setLoading,
                'admin',
                data,
                setData,
                setData1,
                dispatch,
                getAdminSuccess,
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
          title={`Add New Admin`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          width="40%"
          footer={null}
        >
          <div
            style={{
              margin: '1rem',
            }}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              layout="horizontal"
              onFinish={() => {
                registerAdminHandler(
                  FirstName,
                  LastName,
                  Email,
                  PhoneNo,
                  Password,
                  dispatch
                );
                console.log('clicked');
              }}
            >
              <div>
                <Form.Item label="First Name">
                  <Input
                    placeholder="firstName"
                    value={FirstName}
                    onChange={e => setFirstName(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="Last Name">
                  <Input
                    placeholder="lastName"
                    value={LastName}
                    onChange={e => setLastName(e.target.value)}
                    type="text"
                    required
                  />
                </Form.Item>
                <Form.Item label="Email">
                  <Input
                    placeholder="email"
                    value={Email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    required
                  />
                </Form.Item>
                <Form.Item label="Phone No">
                  <Input
                    placeholder="phoneNo"
                    value={PhoneNo}
                    onChange={e => setPhoneNo(e.target.value)}
                    type="number"
                    required
                  />
                </Form.Item>
                <Form.Item label="Password">
                  <Input
                    placeholder="password"
                    value={Password}
                    onChange={e => setPassword(e.target.value)}
                    type="password"
                    required
                  />
                </Form.Item>
              </div>
              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
        <Modal
          title={`Change Password`}
          visible={Visible}
          // onOk={handleOk}
          onCancel={dispatch(closeVisible())}
          maskClosable={false}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => {
              if (NewPassword !== ConfirmPassword) {
                failureNotifier('password not match');
              } else {
                changePasswordHandler(
                  AdminName,
                  OldPassword,
                  NewPassword,
                  ConfirmPassword
                );
              }
            }}
            autoComplete="off"
          >
            <div
              style={{
                width: '400px',
                position: 'relative',
                marginLeft: '20px',
                marginBottom: '20px',
              }}
            >
              <Form.Item label="AdminName">
                <Input
                  placeholder="AdminName"
                  value={AdminName}
                  onChange={e => setAdminName(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
              <Form.Item label="Old Password">
                <Input
                  placeholder="old password"
                  value={OldPassword}
                  onChange={e => setOldPassword(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
              <Form.Item label="New Password">
                <Input
                  placeholder="new password"
                  value={NewPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
              <Form.Item label="Confirm Password">
                <Input
                  placeholder="confirm password"
                  value={NewPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  type="text"
                  required
                />
              </Form.Item>
            </div>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title={`Delete Admin`}
          visible={isModalVisible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
          maskClosable={false}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() =>
              deleteAdminHandler(dispatch, selectedAdmin?.adminCode)
            }
            autoComplete="off"
          >
            <span>Are you sure you want to delete?</span>
            <br></br>
            <br></br>
            <Button type="danger" htmlType="submit">
              delete
            </Button>
          </Form>
        </Modal>
      </Container>
    </Page>
  );
}
