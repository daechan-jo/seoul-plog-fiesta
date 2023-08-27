import pandas as pd
import folium
import json
# from prisma import Client

# prisma = Client()
#
# csv_file_path = "new_seoul_plogging.csv"
# df = pd.read_csv(csv_file_path)
#
# for index, row in df.iterrows():
# 	prisma.course.create({
# 		"WLK_COURS_FLAG_NM": row['WLK_COURS_FLAG_NM'],
# 		"WLK_COURS_NM": row['WLK_COURS_NM'],
# 		"COURS_DC": row['COURS_DC'],
# 		"SIGNGU_NM": row['SIGNGU_NM'],
# 		"COURS_LEVEL_NM": row['COURS_LEVEL_NM'],
# 		"COURS_LT_CN": row['COURS_LT_CN'],
# 		"COURS_DETAIL_LT_CN": row['COURS_DETAIL_LT_CN'],
# 		"ADIT_DC": row['ADIT_DC'],
# 		"COURS_TIME_CN": row['COURS_TIME_CN'],
# 		"OPTN_DC": row['OPTN_DC'],
# 		"TOILET_DC": row['TOILET_DC'],
# 		"CVNTL_NM": row['CVNTL_NM'],
# 		"LNM_ADDR": row['LNM_ADDR'],
# 		"COURS_SPOT_LA": row['COURS_SPOT_LA'],
# 		"COURS_SPOT_LO": row['COURS_SPOT_LO']
# 	})



# 코스 추천 지도

data = pd.read_csv("seoul_plogging.csv")
geo_data = "seoul_municipalities_geo_simple.json"

with open(geo_data, encoding="utf8") as f:
	geo_json_data = json.load(f)

tiles = ["cartodbpositron", "Stamen Toner", "OpenStreetMap"]
initial_location = [37.5665, 126.9780]
initial_zoom = 16
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

folium.GeoJson(
	geo_json_data,
	name="seoul_municipalities",
	style_function=lambda feature: {
		"fillColor": "#00821d",
		"color": "#1e471e",
		# "weight": 0.5,
		# "fillOpacity": 0.2,
	},
).add_to(seoul_map)

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


