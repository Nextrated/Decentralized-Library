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
    setParam('');
  };

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

  //   const reloadFiles = async () => {
  //     await getPublicFiles();
  //       await getPrivateFiles();
  //       await getSharedFiles();
  //       var newArr = publicFiles.concat(privateFiles, sharedFiles);
  //       setAllFiles(newArr);
  //   }

  useEffect(() => {
    async function fetchFiles() {
      await getPublicFiles();
      await getMyPublicFiles();
      await getPrivateFiles();
      await getSharedFiles();
    }
    fetchFiles();
  }, []);

  useEffect(() => {
    var newArr = publicFiles.concat(privateFiles, sharedFiles);
    setAllFiles(newArr);
  }, [publicFiles, privateFiles, sharedFiles]);

  return (
    <Grid minH="100vh" p={3}>
      <Box
        d="flex"
        mx="auto"
        w={{ base: '100%', md: '80%', lg: '70%' }}
        h="auto"
        mt="100px"
        px={{ base: 5, md: 10, lg: 12 }}
      >
        <Input
          type="text"
          placeholder="Enter file title or cid"
          required
          mb={4}
          value={param}
          onChange={e => setParam(e.target.value)}
          w="70%"
          mr={2}
        />
        <Button bg="purple" onClick={() => search(param)} color="white">
          Search
        </Button>
      </Box>

      <Box mt="30px" d="flex" justifyContent="space-between" px={10}>
        <Text fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }} fontWeight="700">
          {showAll ? 'All Files' : null}
          {showShared ? 'Shared With Me' : null}
          {showPublic ? 'Public Files' : null}
          {showMyPublic ? 'My Public Files' : null}
          {showPrivate ? 'Private Files' : null}
        </Text>
        {/* <SampleUpload/> */}
        <Upload />
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
