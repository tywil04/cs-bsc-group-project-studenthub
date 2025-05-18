import requests
from bs4 import BeautifulSoup
import json 

response = requests.get("https://en.wikipedia.org/wiki/List_of_universities_in_the_United_Kingdom")
soup = BeautifulSoup(response.text, 'html.parser')

universities = []

for row in soup.find("table").find_all("tr")[1:]:
    cols = row.find_all("td")
    a = cols[1].find("a")
    title = a["title"]
    url = f"https://en.wikipedia.org{a["href"]}"

    innerResponse = requests.get(url)
    innerSoup = BeautifulSoup(innerResponse.text, 'html.parser')
    for td in innerSoup.find_all("td"):
        innerA = td.find("a")
        if innerA:
            domain = innerA["href"].replace("https://", "").replace("http://", "").replace("/en/", "").replace("/", "").replace("www.", "")
            if domain.endswith(".ac.uk") or domain.endswith(".university"):
                universities.append({
                    "name": title,
                    "domain": domain,
                })
                break

with open("./universities.json", "w+") as file:
    file.write(json.dumps(universities, indent=4))