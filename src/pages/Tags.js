import React from 'react';
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
  Skeleton,
} from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import { addTags, getTagsSuccess, setTag } from '../Actions/TagActions';
import {
  createTagHandler,
  deleteTagHandler,
  updateTagHandler,
} from '../utils/HandlerFunctions/TagHandler';
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';

export default function Tags() {
  const memerData = useSelector(state => state.TagReducer.tags);
  const selectedPlatform = useSelector(state => state.TagReducer.selectedTags);
  const isLoading = useSelector(state => state.TagReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [tagName, setName] = useState('');
  const [Description, setDescription] = useState('');
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName1] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //table columns
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <span>{record?.name}</span>
        </Space>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Created At',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (text, record) => {
        return <span>{moment(record?.createdAt).format('LL')}</span>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <p
            onClick={() => {
              dispatch(setTag(record?._id));
              setIsModalVisible(true);
            }}
          >
            <Icon icon="akar-icons:edit" width={20} />
          </p>
          <p
            onClick={() => {
              dispatch(setTag(record?._id));
              setIsModalVisible4(true);
            }}
          >
            <Icon icon="ant-design:delete-filled" width="20" />
          </p>
        </Space>
      ),
    },
  ];

  //methods section start
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
  const handleOk4 = () => {
    setIsModalVisible4(false);
  };

  const handleCancel4 = () => {
    setIsModalVisible4(false);
  };

  const handleChange = evt => {
    const value = evt;
    setName1(value);
  };
  // methods section ends

  //useEffect section starts
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
    setName(selectedPlatform?.name);
    setDescription(selectedPlatform?.description);
  }, [selectedPlatform]);

  useEffect(() => {
    if (memerData?.length >= 0) {
      setData(memerData);
      setLoading(false);
    }
  }, [memerData]);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'tag',
      data,
      setData,
      setData1,
      dispatch,
      getTagsSuccess,
      navigate
    );
  }, []);
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
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Tags</h3>
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
                      'tag',
                      addTags,
                      dispatch,
                      navigate
                    );
                  }
                }}
                placeholder="find tags..."
                name={Name}
                onChange={handleChange}
              />
              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'tag',
                    addTags,
                    dispatch,
                    navigate
                  )
                }
                style={{
                  color: '#ffffff',
                  background: '#21c980',
                  marginRight: '12px',
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
                'tag',
                data,
                setData,
                setData1,
                dispatch,
                getTagsSuccess,
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
          title={`Edit ${selectedPlatform?.name}`}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          maskClosable={false}
          footer={false}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={() => {
              updateTagHandler(
                navigate,
                dispatch,
                selectedPlatform?.tagCode,
                tagName,
                Description
              );
              setData([]);
              setData1([]);
              setPage(2);
              setPageSize(8);
              setLoading(false);
            }}
            autoComplete="off"
          >
            <div
              style={{
                width: '400px',
                position: 'relative',
                marginLeft: '-30px',
                marginBottom: '20px',
              }}
            >
              <Form.Item label="Name">
                <Input
                  placeholder="name"
                  value={tagName}
                  onChange={e => setName(e.target.value)}
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
              <Form.Item label="TagCode">
                <Input
                  placeholder="tagCode"
                  value={selectedPlatform?.tagCode}
                  // onChange={(e)=>setDescription(e.target.value)}
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
          title={`Add New Tag`}
          visible={isModalVisible3}
          onOk={handleOk3}
          onCancel={handleCancel3}
          maskClosable={false}
          layout="horizontal"
          footer={null}
        >
          <div className="upload-img">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={{ remember: true }}
              onFinish={() => {
                createTagHandler(dispatch, tagName, Description);
                setName('');
                setDescription('');
                handleCancel3();
              }}
              autoComplete="off"
            >
              <div
                style={{
                  width: '400px',
                  position: 'relative',
                  marginLeft: '-30px',
                  marginBottom: '20px',
                }}
              >
                <Form.Item label="Name">
                  <Input
                    placeholder="name"
                    value={tagName}
                    onChange={e => setName(e.target.value)}
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
          title={`delete Tag `}
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
            onFinish={() =>
              deleteTagHandler(dispatch, selectedPlatform?.tagCode)
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
