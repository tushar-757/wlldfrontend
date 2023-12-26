import React from 'react';
import { Container } from '@mui/material';
import Page from '../components/Page';
import {
  Table,
  Input,
  Modal,
  Form,
  Checkbox,
  Skeleton,
  AutoComplete,
  Spin,
  Button,
  Space,
  Image,
  Collapse,
} from 'antd';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCampaign,
  getCampaignSuccess,
  addCampaign,
} from '../Actions/CampaignAction';
import '../styles/user.css';
import { failureNotifier } from '../utils/notifications';
import {
  updateAdminHandler,
  deleteAdminHandler,
} from '../utils/HandlerFunctions/AdminHandler';
import moment from 'moment';
import { Icon } from '@iconify/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

// importing our common search and load more data methods from utils
import { SearchHandler } from '../utils/HandlerFunctions/SearchHandler';
import { loadMoreData } from '../utils/HandlerFunctions/LoadMoreDataHandler';

const { Panel } = Collapse;
export default function Campaign() {
  const navigate = useNavigate();
  const campaignData = useSelector(state => state.CampaignReducer.campaigns);
  const selectedAdmin = useSelector(
    state => state.CampaignReducer.selectedCampaign
  );
  const selectedCampaignBrand = useSelector(
    state => state.CampaignReducer.selectedCampaignBrand
  );
  const selectedCampaignMemerrs = useSelector(
    state => state.CampaignReducer.selectedCampaignMemerrs
  );
  const selectedCampaignContributors = useSelector(
    state => state.CampaignReducer.selectedCampaignContributors
  );
  const selectedCampaignDont = useSelector(
    state => state.CampaignReducer.selectedCampaignDont
  );
  const selectedCampaignDos = useSelector(
    state => state.CampaignReducer.selectedCampaignDos
  );
  const selectedCampaignMessages = useSelector(
    state => state.CampaignReducer.selectedCampaignMessages
  );
  const selectedCampaignObjectives = useSelector(
    state => state.CampaignReducer.selectedCampaignObjectives
  );
  const selectedCampaignPlatform = useSelector(
    state => state.CampaignReducer.selectedCampaignPlatform
  );
  const selectedCampaignResources = useSelector(
    state => state.CampaignReducer.selectedCampaignResources
  );
  const isLoading = useSelector(state => state.CampaignReducer.loading);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [AdminName, setAdminName] = useState(selectedAdmin?.username);
  const [AdminEmail] = useState(selectedAdmin?.email);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [SearchData, setSearchData] = useState([]);
  const [Name, setName] = useState('');
  const dispatch = useDispatch();
  const [status, setStatus] = useState({
    bool1: false,
    bool2: false,
  });

  const columns = [
    {
      title: 'Campaign Name',
      dataIndex: 'campaignName',
      key: 'campaignName',
      render: text => <p>{text}</p>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      render: (text, record) => (
        <span>{moment(record?.startDate).format('DD/MMM/YYYY')}</span>
      ),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      render: (text, record) => (
        <span>{moment(record?.endDate).format('DD/MMM/YYYY')}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Details',
      dataIndex: 'show',
      key: 'show',
      render: (text, record) => (
        <Space>
          <p
            onClick={() => {
              setIsModalVisible2(true);
              dispatch(setCampaign(record?._id));
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
      width: '10%',
    },
    {
      title: 'brandName',
      dataIndex: 'brandName',
      key: 'brandName',
    },
    {
      title: 'website',
      dataIndex: 'website',
      key: 'website',
    },
  ];
  const columns2 = [
    {
      title: 'PlatformName',
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
  ];
  const columns3 = [
    {
      title: 'Picture',
      dataIndex: 'picture',
      key: 'picture',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.picture} />
        </Space>
      ),
      width: '10%',
    },
    {
      title: 'username',
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
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'phoneNo',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
    },
  ];
  const columns4 = [
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'url',
      render: (text, record) => (
        <Space size="middle">
          <Image src={record?.url} />
        </Space>
      ),
      width: '20%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Description',
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

  const handleOk1 = () => {
    setIsModalVisible1(false);
  };

  const handleCancel1 = () => {
    setIsModalVisible1(false);
  };
  const handleOk2 = () => {
    setIsModalVisible2(false);
  };

  const handleCancel2 = () => {
    setIsModalVisible2(false);
  };

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

  //useEffect section
  useEffect(() => {
    if (SearchData === 'not found') {
      failureNotifier('not found');
    }
    if (SearchData?.length === 0) {
      setData(campaignData);
      setData1(campaignData);
      setLoading(false);
    } else if (SearchData?.length >= 1 && SearchData[0] !== undefined) {
      setData(SearchData);
      setData1([]);
      setLoading(false);
    } else {
      setData(campaignData);
      setLoading(false);
    }
  }, [campaignData, SearchData]);

  useEffect(() => {
    if (campaignData?.length >= 0) {
      setData(campaignData);
    }
  }, [campaignData]);

  useEffect(() => {
    loadMoreData(
      page,
      pageSize,
      setPage,
      loading,
      setLoading,
      'campaign',
      data,
      setData,
      setData1,
      dispatch,
      getCampaignSuccess,
      navigate
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <h3 style={{ margin: '1rem' }}>Dashboard/Page/Campaign</h3>
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
                placeholder="find campaigns..."
                name={Name}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    SearchHandler(
                      setSearchData,
                      setLoading,
                      Name,
                      'campaign',
                      addCampaign,
                      dispatch,
                      navigate
                    );
                  }
                }}
                onChange={handleChange}
              />

              <Button
                onClick={() =>
                  SearchHandler(
                    setSearchData,
                    setLoading,
                    Name,
                    'campaign',
                    addCampaign,
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
                'campaign',
                data,
                setData,
                setData1,
                dispatch,
                getCampaignSuccess,
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
          title={`Edit ${selectedAdmin?.username}`}
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
                selectedAdmin?._id
              )
            }
            //   onFinishFailed={onFinishFailed}
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
          title={`delete ${selectedAdmin?.username} `}
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
            onFinish={() => deleteAdminHandler(selectedAdmin?._id)}
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
          title={`Campaigns`}
          visible={isModalVisible2}
          onOk={handleOk2}
          onCancel={handleCancel2}
          maskClosable={false}
          footer={null}
          width="50%"
        >
          <Collapse accordion>
            <Panel header="Brands" key="1">
              <Table
                columns={columns1}
                dataSource={selectedCampaignBrand}
                pagination={false}
              />
            </Panel>
            <Panel header="Memerrs" key="2">
              <Table
                columns={columns3}
                dataSource={selectedCampaignMemerrs}
                pagination={false}
              />
            </Panel>
            <Panel header="Contributors" key="3">
              {selectedCampaignContributors?.map(data => (
                <div>{data}</div>
              ))}
            </Panel>
            <Panel header="Do's" key="4">
              {selectedCampaignDos?.map(data => (
                <div>{data?.message}</div>
              ))}
            </Panel>
            <Panel header="Dont's" key="5">
              {selectedCampaignDont?.map(data => (
                <div>{data?.message}</div>
              ))}
            </Panel>
            <Panel header="Messages" key="6">
              {selectedCampaignMessages?.map(data => (
                <div>{data?.message}</div>
              ))}
            </Panel>
            <Panel header="Objectives" key="7">
              {selectedCampaignObjectives?.map(data => (
                <div>{data?.message}</div>
              ))}
            </Panel>
            <Panel header="Platform" key="8">
              <Table
                columns={columns2}
                dataSource={selectedCampaignPlatform}
                pagination={false}
              />
            </Panel>
            <Panel header="Resources" key="9">
              <Table
                columns={columns4}
                dataSource={selectedCampaignResources}
                pagination={false}
              />
            </Panel>
          </Collapse>
        </Modal>
      </Container>
    </Page>
  );
}
