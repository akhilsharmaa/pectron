import requests
import json

# searching from https://serper.dev/playground api provider. 
def imageSearchOnSerper(query: str):
    """ Seach images and return some images from the google search"""
     
    url = "https://google.serper.dev/images"

    payload = json.dumps({
        "q": query
    })
    
    #TODO: CHANGE THE API KEY & GET FROM THE .env file. 
    
    headers = {
        'X-API-KEY': '855664a0927de766b7c21dd7a7069436c8ff4944',
        'Content-Type': 'application/json'
    }
 
    response = requests.request("POST", url, headers=headers, data=payload)
    result = json.loads(response.text) 
    images = result["images"]; 
    
    return images[:10]; 
     
def search_image(query: str):
    # return imageSearchOnSerper(query=query);
    
    # TODO: remove dummy data and add actuall data. 
    return  [
  {
    "title": "Sri Lanka | History, Map, Flag, Population, Capital, & Facts ...",
    "imageUrl": "https://cdn.britannica.com/14/4414-050-18764C01/Sri-Lanka-boundaries-map-cities-locator.jpg",
    "imageWidth": 1600,
    "imageHeight": 1331,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7s2Du6bBLiYmlqXRQY2ae92KzRno3GFgzkre2Bt32GIfasUY&s",
    "thumbnailWidth": 246,
    "thumbnailHeight": 205,
    "source": "Britannica",
    "domain": "www.britannica.com",
    "link": "https://www.britannica.com/place/Sri-Lanka",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F14%2F4414-050-18764C01%2FSri-Lanka-boundaries-map-cities-locator.jpg&tbnid=ac7ouLvn4XPa4M&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fplace%2FSri-Lanka&docid=0KC_2L9qMh7jDM&w=1600&h=1331&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcIAigA",
    "position": 1
  },
  {
    "title": "Sri Lanka, an Island Nation That Is Best Savored Slowly - The New ...",
    "imageUrl": "https://static01.nyt.com/images/2019/02/03/travel/03frugal-srilanka01/merlin_148552275_74c0d250-949c-46e0-b8a1-e6d499e992cf-superJumbo.jpg",
    "imageWidth": 2048,
    "imageHeight": 1365,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPNE7MgCBrz53QEuiTGletzzDvnJ-DLgseB1XnqVJter8EMBZn&s",
    "thumbnailWidth": 275,
    "thumbnailHeight": 183,
    "source": "The New York Times",
    "domain": "www.nytimes.com",
    "link": "https://www.nytimes.com/2019/01/30/travel/budget-travel-sri-lanka.html",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic01.nyt.com%2Fimages%2F2019%2F02%2F03%2Ftravel%2F03frugal-srilanka01%2Fmerlin_148552275_74c0d250-949c-46e0-b8a1-e6d499e992cf-superJumbo.jpg&tbnid=c3ODN24PXUfCDM&imgrefurl=https%3A%2F%2Fwww.nytimes.com%2F2019%2F01%2F30%2Ftravel%2Fbudget-travel-sri-lanka.html&docid=CG5bGkcE3SfIVM&w=2048&h=1365&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcIAygB",
    "position": 2
  },
  {
    "title": "Sri Lanka - Wikipedia",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Flag_of_Sri_Lanka.svg/1200px-Flag_of_Sri_Lanka.svg.png",
    "imageWidth": 1200,
    "imageHeight": 600,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_uRIyJInbtvd4lnvYCusmc-yWMcZFYH_5VTQNIw-LOsvAog-2&s",
    "thumbnailWidth": 318,
    "thumbnailHeight": 159,
    "source": "Wikipedia",
    "domain": "en.wikipedia.org",
    "link": "https://en.wikipedia.org/wiki/Sri_Lanka",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fthumb%2F1%2F11%2FFlag_of_Sri_Lanka.svg%2F1200px-Flag_of_Sri_Lanka.svg.png&tbnid=KgE-7lahyoyJwM&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSri_Lanka&docid=yztkFJfLvE6FqM&w=1200&h=600&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcIBCgC",
    "position": 3
  },
  {
    "title": "Sri Lanka country profile - BBC News",
    "imageUrl": "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/9172/production/_129043273_bbcm_sri-lanka_country_profile_map_170323.png",
    "imageWidth": 976,
    "imageHeight": 549,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCPayJOAeRuxBnxsk24n7EVNE8XqmiA5NeX2k8Fxv8WipEDcWk&s",
    "thumbnailWidth": 300,
    "thumbnailHeight": 168,
    "source": "BBC",
    "domain": "www.bbc.com",
    "link": "https://www.bbc.com/news/world-south-asia-11999611",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fichef.bbci.co.uk%2Face%2Fstandard%2F976%2Fcpsprodpb%2F9172%2Fproduction%2F_129043273_bbcm_sri-lanka_country_profile_map_170323.png&tbnid=NKcnWtExHqDdbM&imgrefurl=https%3A%2F%2Fwww.bbc.com%2Fnews%2Fworld-south-asia-11999611&docid=2hU3Ox2IN9TGcM&w=976&h=549&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcIBSgD",
    "position": 4
  },
  {
    "title": "Sri Lanka | History, Map, Flag, Population, Capital, & Facts ...",
    "imageUrl": "https://cdn.britannica.com/62/183762-050-365CBBAC/World-Data-Locator-Map-Sri-Lanka.jpg?w=400&h=225&c=crop",
    "imageWidth": 400,
    "imageHeight": 225,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1HOUz-LmJe-tvtvs522Z0dbO9vel_nDnoRdwXgEmvBbRAXZg&s",
    "thumbnailWidth": 300,
    "thumbnailHeight": 168,
    "source": "Britannica",
    "domain": "www.britannica.com",
    "link": "https://www.britannica.com/place/Sri-Lanka",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fcdn.britannica.com%2F62%2F183762-050-365CBBAC%2FWorld-Data-Locator-Map-Sri-Lanka.jpg%3Fw%3D400%26h%3D225%26c%3Dcrop&tbnid=Wgt5CWzJwPmOMM&imgrefurl=https%3A%2F%2Fwww.britannica.com%2Fplace%2FSri-Lanka&docid=0KC_2L9qMh7jDM&w=400&h=225&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcIBigE",
    "position": 5
  },
  {
    "title": "Sri Lanka Travel Guide: How To Plan The Perfect Trip",
    "imageUrl": "https://imageio.forbes.com/specials-images/imageserve/669586ab808e35d887e3449c/0x0.jpg?format=jpg&crop=1151,647,x0,y2,safe&height=900&width=1600&fit=bounds",
    "imageWidth": 1600,
    "imageHeight": 899,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LbvD-KE8-nhgJKnrqNqpmTA-8d0xKuS6AsnHdFco5WX2G6pg&s",
    "thumbnailWidth": 300,
    "thumbnailHeight": 168,
    "source": "Forbes",
    "domain": "www.forbes.com",
    "link": "https://www.forbes.com/sites/liviahengel/2024/07/16/sri-lanka-travel-guide-how-to-plan-the-perfect-trip/",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimageio.forbes.com%2Fspecials-images%2Fimageserve%2F669586ab808e35d887e3449c%2F0x0.jpg%3Fformat%3Djpg%26crop%3D1151%2C647%2Cx0%2Cy2%2Csafe%26height%3D900%26width%3D1600%26fit%3Dbounds&tbnid=IlWlM3HtcCWHrM&imgrefurl=https%3A%2F%2Fwww.forbes.com%2Fsites%2Fliviahengel%2F2024%2F07%2F16%2Fsri-lanka-travel-guide-how-to-plan-the-perfect-trip%2F&docid=KZDnkNUeWEFCXM&w=1600&h=899&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcIBygF",
    "position": 6
  },
  {
    "title": "SRI LANKA Experience : Wild and breathtaking Nature",
    "imageUrl": "https://i.ytimg.com/vi/KCn5Gc38oO4/maxresdefault.jpg",
    "imageWidth": 1280,
    "imageHeight": 720,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3eeFh7zvBV8IJpGE-G25N9ylOt4mODlc9Ww5dUBfaVAcaz7s&s",
    "thumbnailWidth": 300,
    "thumbnailHeight": 168,
    "source": "YouTube",
    "domain": "www.youtube.com",
    "link": "https://www.youtube.com/watch?v=KCn5Gc38oO4",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.ytimg.com%2Fvi%2FKCn5Gc38oO4%2Fmaxresdefault.jpg&tbnid=BfBvEm-9ELMU7M&imgrefurl=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DKCn5Gc38oO4&docid=u-_oQeM45q5XOM&w=1280&h=720&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcICCgG",
    "position": 7
  },
  {
    "title": "Sri Lanka - United States Department of State",
    "imageUrl": "https://www.state.gov/wp-content/uploads/2023/07/shutterstock_1864316470v2.jpg",
    "imageWidth": 2560,
    "imageHeight": 1704,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhNaZ8mUZKu8ImBuAPiXEFm28w-UgS-VpFlNRscBtQFe8Ikws&s",
    "thumbnailWidth": 275,
    "thumbnailHeight": 183,
    "source": "Department of State",
    "domain": "www.state.gov",
    "link": "https://www.state.gov/countries-areas/sri-lanka/",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.state.gov%2Fwp-content%2Fuploads%2F2023%2F07%2Fshutterstock_1864316470v2.jpg&tbnid=2sHFPttNaXisyM&imgrefurl=https%3A%2F%2Fwww.state.gov%2Fcountries-areas%2Fsri-lanka%2F&docid=J1LmQFqKuJoiAM&w=2560&h=1704&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcICSgH",
    "copyright": "Copyright (c) 2020 travelwild/Shutterstock.  No use without permission.",
    "creator": "travelwild",
    "credit": "Shutterstock",
    "position": 8
  },
  {
    "title": "15 things to know before traveling to Sri Lanka - Lonely Planet",
    "imageUrl": "https://lp-cms-production.imgix.net/2024-11/shutterstock1473912101.jpg?fit=crop&w=3840&auto=format&q=75",
    "imageWidth": 3840,
    "imageHeight": 2563,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3AHqJecSLC4_qSA8l27WXAa_VmiyhYUL-VltefXQst-iOQlyL&s",
    "thumbnailWidth": 275,
    "thumbnailHeight": 183,
    "source": "Lonely Planet",
    "domain": "www.lonelyplanet.com",
    "link": "https://www.lonelyplanet.com/articles/things-to-know-before-traveling-to-sri-lanka",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Flp-cms-production.imgix.net%2F2024-11%2Fshutterstock1473912101.jpg%3Ffit%3Dcrop%26w%3D3840%26auto%3Dformat%26q%3D75&tbnid=odX_dF2_PT4_IM&imgrefurl=https%3A%2F%2Fwww.lonelyplanet.com%2Farticles%2Fthings-to-know-before-traveling-to-sri-lanka&docid=mFohY5VOgTSsQM&w=3840&h=2563&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcICigI",
    "position": 9
  },
  {
    "title": "Sri Lanka: Wildlife and Wonders of the Spice Island",
    "imageUrl": "https://www.nationalgeographic.com/content/dam/expeditions/destinations/asia/land/sri-lanka-wildlife-and-wonders-of-the-spice-island/SriLankaJun24-650x650.jpg.adapt.six-sixty-seven.jpg",
    "imageWidth": 650,
    "imageHeight": 650,
    "thumbnailUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPQe90RkqqXfByIFCqKYF9qy3pP4GHujJC9yiMEoaeAjCGTEw&s",
    "thumbnailWidth": 225,
    "thumbnailHeight": 225,
    "source": "National Geographic",
    "domain": "www.nationalgeographic.com",
    "link": "https://www.nationalgeographic.com/expeditions/destinations/asia/land/sri-lanka-wildlife-and-wonders-of-the-spice-island/",
    "googleUrl": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.nationalgeographic.com%2Fcontent%2Fdam%2Fexpeditions%2Fdestinations%2Fasia%2Fland%2Fsri-lanka-wildlife-and-wonders-of-the-spice-island%2FSriLankaJun24-650x650.jpg.adapt.six-sixty-seven.jpg&tbnid=YCmYIpdJYg4MTM&imgrefurl=https%3A%2F%2Fwww.nationalgeographic.com%2Fexpeditions%2Fdestinations%2Fasia%2Fland%2Fsri-lanka-wildlife-and-wonders-of-the-spice-island%2F&docid=UeVfT6-jS4brjM&w=650&h=650&ved=0ahUKEwiRp6fPjZ6LAxUfB9sEHfmBGwIQvFcICygJ",
    "position": 10
  }
]
            

