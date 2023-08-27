import matplotlib.font_manager
import pandas as pd
import matplotlib.pyplot as plt


data = pd.read_csv('자치구별무단투기단속실적.csv')

data.set_index('자치구', inplace=True)

garbage_2022 = data['2022']
total_garbage_2022 = garbage_2022.sum()

font_path = matplotlib.font_manager.FontProperties(fname="YOUR_FONT_PATH").get_name()
plt.rc('font', family=font_path)

plt.figure(figsize=(10, 6))
garbage_2022.plot(kind='bar')
plt.xlabel('자치구')
plt.ylabel('무단 투기량')
plt.title('2022년 자치구별 무단 투기량')
plt.xticks(rotation=45)
plt.show()