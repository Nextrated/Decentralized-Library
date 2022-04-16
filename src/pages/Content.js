import { Box, Button, Grid, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fetchPrivateFiles, fetchPublicFiles, fetchSharedFiles, fetchMyPublicFiles } from '../api';
import Upload from '../components/Upload';
import AllFiles from './AllFiles';
import PrivateFiles from './PrivateFiles';
import PublicFiles from './PublicFiles';
import MyPublicFiles from './MyPublicFiles';
import SearchFiles from './SearchFiles';
import SharedFiles from './SharedFiles';

export default function Content({
  showAll,
  showShared,
  showPublic,
  showMyPublic,
  showPrivate,
  showSearchPage,
  setSearchPage,
  showAllFilesPage,
}) {
  const [publicFiles, setPublicFiles] = useState([]);
  const [myPublicFiles, setMyPublicFiles] = useState([]);
  const [privateFiles, setPrivateFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [searchedFiles, setSearchedFiles] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const [param, setParam] = useState('');
  const [loading, setLoading] = useState(false)

  const search = y => {
    y = y.toLowerCase();
    const res = allFiles?.filter(
      x => x.name.toLowerCase().includes(y) || x.cid.toLowerCase().includes(y)
    );
    if (res === null || res === undefined) {
      setSearchedFiles([]);
    } else {
      setSearchedFiles(res);
    }
    setSearchPage();
    // setParam('');
  };

  const handleSearch = (e) => {
    setParam(e.target.value);
    search(e.target.value);
  }

  //function to get all public files
  const getPublicFiles = async () => {
    const files = await fetchPublicFiles(window.ethereum);
    setPublicFiles(files);
  };

  //function to get all user's public files
  const getMyPublicFiles = async () => {
    const files = await fetchMyPublicFiles(window.ethereum);
    setMyPublicFiles(files);
  };

  //function to get all private files
  const getPrivateFiles = async () => {
    const files = await fetchPrivateFiles(window.ethereum);
    setPrivateFiles(files);
  };

  //function to get all shared files
  const getSharedFiles = async () => {
    const files = await fetchSharedFiles(window.ethereum);
    setSharedFiles(files);
  };

  useEffect(() => {
    async function fetchFiles() {
      await getPublicFiles();
      await getMyPublicFiles();
      await getPrivateFiles();
      await getSharedFiles();
    }
    fetchFiles();
  }, [loading]);

//function to trigger change in loading state causing the page to remount
  const refresh = (x) => {
      setLoading(x)
  }

  useEffect(() => {
    var newArr = publicFiles.concat(privateFiles, sharedFiles);
    setAllFiles(newArr);
  }, [publicFiles, privateFiles, sharedFiles]);

  return (
    <Grid minH="100vh" p={3}>
      <Box
        d="flex"
        mx={{base:"0px", md:"auto"}}
        w={{ base: '100%', md: '80%', lg: '70%' }}
        h="auto"
        mt="100px"
        px={{ base: 5, md: 10, lg: 12 }}
      >
        <Input
          type="text"
          placeholder="Enter file title or cid to search all files"
          required
          mb={4}
          value={param}
          onChange={handleSearch}
          //onChange={e => setParam(e.target.value)}
          w="70%"
          mr={2}
        />
        <Button bg="purple" onClick={() => search(param)} color="white">
          Search
        </Button>
      </Box>

      <Box mt="30px" d="flex" justifyContent="space-between" px={10}>
        <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} fontWeight="700">
          {showAll ? `All Files- (${allFiles?.length>0 ? allFiles.length : "0"})` : null}
          {showShared ? `Shared With Me- (${sharedFiles?.length>0 ? sharedFiles.length : "0"})` : null}
          {showPublic ? `Public Files- (${publicFiles?.length>0 ? publicFiles.length : "0"})` : null}
          {showMyPublic ? `My Public Files- (${myPublicFiles?.length>0 ? myPublicFiles.length : "0"})` : null}
          {showPrivate ? `My Private Files- (${privateFiles?.length>0 ? privateFiles.length : "0"})` : null}
        </Text>
        {/* <SampleUpload/> */}
        <Upload  reload={refresh} loading={loading}/>
      </Box>
      {showAll ? <AllFiles files={allFiles} /> : null}
      {showPrivate ? <PrivateFiles privateFiles={privateFiles} /> : null}
      {showPublic ? <PublicFiles publicFiles={publicFiles} /> : null}
      {showMyPublic ? <MyPublicFiles myPublicFiles={myPublicFiles} /> : null}
      {showShared ? <SharedFiles sharedFiles={sharedFiles} /> : null}
      {showSearchPage ? (
        <SearchFiles files={searchedFiles} showAll={showAllFilesPage} />
      ) : null}
    </Grid>
  );
}
