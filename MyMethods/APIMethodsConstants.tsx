const fetchApiData = async (url: string) => {
    // const url = 'https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=' + userIdApp;
    try {
      // const url = `https://shreddersbay.com/API/address_api.php?action=AddrByUserId&user_id=1999`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
    //   console.log("All address result:-", result)
    //   console.log("check address response:-",response)
    //   setData(result);
    //   setSelectedCountry(result.length > 0 ? result[0].country_name : '');
    return result;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  export {fetchApiData}