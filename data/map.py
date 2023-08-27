import pandas as pd
import folium

# with open("KC_CFR_WLK_STRET_INFO_2021.csv") as f:
#     data = pd.read_csv(f)
# df = pd.DataFrame(data)
# columns_to_drop = ["COURS_DC"]
# df.drop(columns=columns_to_drop, inplace=True)
# df.to_csv("./plogging.csv")
#
# file_path = "KC_CFR_WLK_STRET_INFO_2021.csv"
# data = pd.read_csv(file_path)
#
# # Filter rows where SIGNGU_NM starts with "Seoul"
# seoul_rows = data[data["SIGNGU_NM"].str.startswith("서울")]
#
# # Print the resulting DataFrame
# seoul_rows.to_csv("./seoul_plogging.csv")
#
# seoul_rows = pd.read_csv("./seoul_plogging.csv")

############################################################################################################
data = pd.read_csv("seoul_plogging.csv")
tiles = ["cartodbpositron", "Stamen Toner", "OpenStreetMap"]
initial_location = [37.5665, 126.9780]
initial_zoom = 15
min_zoom = 12
max_zoom = 15
southwest = [37.425, 126.764]
northeast = [37.701, 127.183]

seoul_map = folium.Map(
	location=initial_location,
	zoom_start=initial_zoom,
	tiles=tiles[0],
	min_zoom=min_zoom,
	max_zoom=max_zoom,
	width=1600,
	height=700,
)

seoul_map.fit_bounds([southwest, northeast], max_zoom=initial_zoom)
seoul_map.options["maxBounds"] = [southwest.copy(), northeast.copy()]
seoul_map.options["minZoom"] = min_zoom

for index, row in data.iterrows():
	popup_text = (
		f"코스: {row['WLK_COURS_NM']}<br>"
		f"레벨: {row['COURS_LEVEL_NM']}<br>"
		f"길이: {row['COURS_LT_CN']} km<br>"
		f"위치: {row['SIGNGU_NM']}<br>"
		f"정보: {row['COURS_DC']}"
	)

	popup_html = folium.Html(popup_text, script=True)
	popup = folium.Popup(popup_html, max_width="1000")

	marker = folium.Marker(
		location=[row["COURS_SPOT_LA"], row["COURS_SPOT_LO"]],
		popup=popup,
		icon=folium.Icon(color="green", icon="info-sign"),
	)
	marker.add_to(seoul_map)

seoul_map.save("seoul_course_map.html")
