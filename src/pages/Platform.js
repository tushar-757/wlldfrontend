import React, { useRef } from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Form,
  AutoComplete,
  Spin,
  Button,
  Space,
  Image,
  Skeleton,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import { deleteAdminHandler } from '../utils/HandlerFunctions/AdminHandler';
import {
  addPlatform,
  getPlatformSuccess,
  setPlatform,
} from '../Actions/PlatformActions';
import {
  createPlatformHandler,
  deletePlatformHandler,
  updatePlatformHandler,
} from '../utils/HandlerFunctions/PlatformHandler';
import api from '../services/backendApi';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';

export default function Platform() {
  const memerData = useSelector(state => state.PlatformReducer.platform);
  const selectedPlatform = useSelector(
    state => state.PlatformReducer.selectedPlatform
  );
  const isLoading = useSelector(state => state.PlatformReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [platformName, setPlatName] = useState('');
  const [Description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [background, setBackground] = useState('');
  const [File, setFile] = useState(null);
  const [File1, setFile1] = useState(null);
  const [inputList, setInputList] = useState([{ name: '', description: '' }]);
  const [inputList1, setInputList1] = useState(selectedPlatform?.formats);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const [, setLogoUrl] = useState('');
  const [, setBackgroundUrl] = useState('');
  const object = useRef(null);
  const object1 = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = event => {
    object.current.click();
  };
  const handleChange1 = event => {
    setFile(event.target.files[0]);
  };
  const handleClick1 = event => {
    object1.current.click();
  };
  const handleChange2 = event => {
    setFile1(event.target.files[0]);
  };
  const columns = [
    {
      title: 'Platform Name',
      dataIndex: 'platformName',
      key: 'platformName',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.platformName}</span>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Logo',
      dataIndex: 'Logo',
      key: 'Logo',
      render: (text, record) => {
        return (
          <span>
            <Image
              src={record?.logo}
              style={{ width: '100%', height: '25%' }}
            />
          </span>
        );
      },
      width: '2%',
    },
    {
      title: 'Background',
      dataIndex: 'Background',
      key: 'Background',
      render: (text, record) => {
        return (
          <span>
            <Image
              src={record?.background}
              style={{ width: '100%', height: '25%' }}
            />
          </span>
        );
      },
      width: '2%',
    },
    // {
    //     title: 'code',
    //     dataIndex: 'code',
    //     key: 'code',
    //     render:(text,record)=>{
    //         return(
    //       <span>
    //       {(record?.platformCode)}
    //           </span>
    //         )
    //     },
    //     width:"2%"
    // },
    {
      title: 'Formats',
      key: 'action',
      render: (text, record) => (
        <Space>
          <p
            onClick={() => {
              setIsModalVisible2(true);
              dispatch(setPlatform(record?._id));
            }}
          >
            <Icon icon="bi:info-circle-fill" width={20} />
          </p>
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              dispatch(setPlatform(record?._id));
              setIsModalVisible(true);
            }}
          >
            <Icon icon="akar-icons:edit" width="20" />
          </p>
          <p
            onClick={() => {
              dispatch(setPlatform(record?._id));
              setIsModalVisible4(true);
            }}
          >
            <Icon icon="ant-design:delete-filled" width="20" />
          </p>
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.name}</span>
        </Space>
      ),
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };
  const handleOk3 = () => {
    setIsModalVisible3(false);
  };

  const handleCancel3 = () => {
    setIsModalVisible3(false);
  };
  const handleOk4 = () => {
    setIsModalVisible4(false);
  };

  const handleCancel4 = () => {
    setIsModalVisible4(false);
  };

  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    if (inputList[0]?.name === '' && inputList[0]?.description === '') {
      return;
    }
    setInputList([...inputList, { name: '', description: '' }]);
  };
  // handle input change
  const handleInputChangeEdit = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList1];
    list[index][name] = value;
    setInputList1(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickEdit = index => {
    const list = [...inputList1];
    list.splice(index, 1);
    setInputList1(list);
  };

  // handle click event of the Add button
  const handleAddClickEdit = () => {
    setInputList1([...inputList1, { name: '', description: '' }]);
  };

  const uploadImage = async () => {
    if (File == null) {
      return;
    }
    const admin = localStorage.getItem('admin');

    const eventData = new FormData();
    eventData.append('file', File);
    const upload = await api.post('/upload/single', eventData, {
      headers: {
        Authorization: `Bearer ${admin}`,
      },
    });
    //  console.log(upload)
    setLogo(upload?.data?.result?.location);
    setLogoUrl(upload?.data?.result?.location);
  };

  const uploadImage1 = async () => {
    if (File1 == null) {
      return;
    }
    const admin = localStorage.getItem('admin');
    const eventData = new FormData();
    eventData.append('file', File1);
    const upload = await api.post('/upload/single', eventData, {
      headers: {
        Authorization: `Bearer ${admin}`,
      },
    });
    setBackground(upload?.data?.result?.location);
    setBackgroundUrl(upload?.data?.result?.location);
  };

  const handleChange = evt => {
    const value = evt;
    setName(value);
  };

  //useEffect section
  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      // console.log("not found")
      setData(memerData);
      setData1(memerData);
      setLoading(false);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
      setLoading(false);
    } else {
      setData(memerData);
      setLoading(false);
    }
  }, [memerData, SearchData]);

  useEffect(() => {
    setPlatName(selectedPlatform?.platformName);
    setDescription(selectedPlatform?.description);
    setFile({ name: selectedPlatform?.logo });
    setFile1({ name: selectedPlatform?.background });
    setInputList1(
      selectedPlatform?.formats?.map(d => ({
        name: d?.name,
        description: d?.description,
      }))
    );
  }, [selectedPlatform]);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'platform',
      data,
      setData,
      setData1,
      dispatch,
      getPlatformSuccess,
      navigate
    );
  }, []);

  useEffect(() => {
    if (File != null) {
      uploadImage();
    }
  }, [File]);

  useEffect(() => {
    if (File1 != null) {
      uploadImage1();
    }
  }, [File1]);

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
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Platform</h3>
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
                      'platform',
                      addPlatform,
                      dispatch,
                      navigate
                    );
                  }
                }}
                placeholder="find platform..."
                name={Name}
                onChange={handleChange}
              />
              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'platform',
                    addPlatform,
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
              <Button onClick={() => setIsModalVisible3(true)}>+</Button>
            </Input.Group>
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
                'platform',
                data,
                setData,
                setData1,
                dispatch,
                getPlatformSuccess,
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
            <Table
              columns={columns}
              dataSource={Array.isArray(data) ? data : []}
              pagination={false}
            />
          </InfiniteScroll>
        )}
        <Modal
          title={`Edit ${selectedPlatform?.platformName}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          footer={false}
        >
          <div className="upload-img">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={() => {
                updatePlatformHandler(
                  navigate,
                  dispatch,
                  selectedPlatform?.platformCode,
                  platformName,
                  Description,
                  logo,
                  background,
                  inputList1
                );
                setPlatName('');
                setDescription('');
                setLogo('');
                setBackground('');
                handleCancel();
                setData([]);
                setData1([]);
                setPage(2);
                setPageSize(8);
                setLoading(false);
              }}
              //   onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <div>
                <Form.Item label="Platform Name">
                  <Input
                    placeholder="name"
                    value={platformName}
                    onChange={e => setPlatName(e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    placeholder="description"
                    value={Description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item label="Logo">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%' }}>
                      <Input value={File?.name} required disabled />
                    </div>
                    <div>
                      <Icon
                        icon="el:upload"
                        width="24"
                        color="gray"
                        onClick={handleClick}
                      />
                      <input
                        ref={object}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange1}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item label="Background">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%' }}>
                      <Input value={File1?.name} required disabled />
                    </div>
                    <div>
                      <Icon
                        icon="el:upload"
                        width="24"
                        color="gray"
                        onClick={handleClick1}
                      />
                      <input
                        ref={object1}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange2}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item label="Formats">
                  {inputList1?.map((x, i) => {
                    return (
                      <div className="box" style={{ display: 'flex' }}>
                        <div>
                          <Input
                            name="name"
                            placeholder="name"
                            value={x.name}
                            onChange={e => handleInputChangeEdit(e, i)}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            className="ml10"
                            name="description"
                            placeholder="description"
                            value={x.description}
                            onChange={e => handleInputChangeEdit(e, i)}
                            required
                          />
                        </div>
                        <div
                          className="btn-box"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          {inputList1.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => handleRemoveClickEdit(i)}
                            >
                              -
                            </Button>
                          )}
                          {inputList1.length - 1 === i && (
                            <Button
                              onClick={handleAddClickEdit}
                              style={{ float: 'right' }}
                            >
                              +
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Form.Item>
                <Form.Item
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
        <Modal
          title={`delete Platform `}
          visible={isModalVisible4}
          onOk={handleOk4}
          onCancel={handleCancel4}
          maskClosable={false}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={
              () =>
                deletePlatformHandler(dispatch, selectedPlatform?.platformCode)
              //  deleteAdminHandler(selectedPlatform?._id)
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
        <Modal
          // title={`delete ${selectedPlatform?.username} `}
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          maskClosable={false}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => deleteAdminHandler(selectedPlatform?._id)}
            autoComplete="off"
          >
            <span>formats</span>
            <Table columns={columns1} dataSource={selectedPlatform?.formats} />
          </Form>
        </Modal>
        <Modal
          title={`Add New Platform`}
          visible={isModalVisible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
          maskClosable={false}
          footer={false}
        >
          <div className="upload-img">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              layout="horizontal"
              onFinish={() => {
                createPlatformHandler(
                  dispatch,
                  platformName,
                  Description,
                  logo,
                  background,
                  inputList
                );
                setPlatName('');
                setDescription('');
                handleCancel3();
              }}
              autoComplete="off"
            >
              <div>
                <Form.Item label="Platform Name">
                  <Input
                    placeholder="name"
                    value={platformName}
                    onChange={e => setPlatName(e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item label="Description">
                  <Input
                    placeholder="description"
                    value={Description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </Form.Item>
                <Form.Item label="Logo">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%' }}>
                      <Input value={File?.name} required disabled />
                    </div>
                    <div>
                      <Icon
                        icon="el:upload"
                        width="24"
                        color="gray"
                        onClick={handleClick}
                      />
                      <input
                        ref={object}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange1}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item label="Background">
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '50%' }}>
                      <Input value={File1?.name} required disabled />
                    </div>
                    <div>
                      <Icon
                        icon="el:upload"
                        width="24"
                        color="gray"
                        onClick={handleClick1}
                      />
                      <input
                        ref={object1}
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleChange2}
                      />
                    </div>
                  </div>
                </Form.Item>
                <Form.Item label="Formats">
                  {inputList.map((x, i) => {
                    return (
                      <div className="box" style={{ display: 'flex' }}>
                        <div>
                          <Input
                            name="name"
                            placeholder="name"
                            value={x.name}
                            onChange={e => handleInputChange(e, i)}
                            required
                          />
                        </div>
                        <div>
                          <Input
                            className="ml10"
                            name="description"
                            placeholder="description"
                            value={x.description}
                            onChange={e => handleInputChange(e, i)}
                            required
                          />
                        </div>
                        <div
                          className="btn-box"
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                          }}
                        >
                          {inputList.length !== 1 && (
                            <Button
                              className="mr10"
                              onClick={() => handleRemoveClick(i)}
                            >
                              -
                            </Button>
                          )}
                          {inputList.length - 1 === i && (
                            <Button
                              onClick={handleAddClick}
                              style={{ float: 'right' }}
                            >
                              +
                            </Button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </Form.Item>
                <Form.Item
                  style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </Modal>
      </Container>
    </Page>
  );
}
