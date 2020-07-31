#!/usr/bin/env python
# coding: utf-8

# In[4]:


import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
#get_ipython().run_line_magic('matplotlib', 'inline')


# In[18]:


data = pd.read_csv(r'./final.csv')
print(data.shape)
data_state = data.State_Name.unique()
slope_values = []


# In[19]:


def LR(i, season):
    data_statei = data[data["State_Name"] == i]
    data_state_season = data_statei[data_statei['Season'] == season]
    print(data_state_season.shape)
    data_state_season_crop = data_state_season.Crop.unique()
    data_state_season_cropnumber = data_state_season.Crop.nunique()
    if(data_state_season_cropnumber == 2):
        print('Crops =' + data_state_season_crop)
        return
    else:
        for crop in data_state_season_crop:
            crop_values = data_state_season[data_state_season['Crop'] == crop]
            X = crop_values['Area'].values
            Y = crop_values['Production'].values
            X = X.reshape(-1, 1)  # Area
            Y = Y.reshape(-1, 1)  # Production
            mean_x = np.mean(X)
            mean_y = np.mean(Y)
            t = len(X)
            training_x, testing_x, training_y, testing_y = train_test_split(
                X, Y, test_size=0.3, random_state=0)
            Lin = LinearRegression()
            Lin.fit(training_x, training_y)
            # plt.scatter(training_x,training_y, color='green',  label='Scatter Plot')
            # plt.plot(training_x,Lin.predict(training_x),color='blue', label='regression Line')
            # plt.title(crop)
            # plt.xlabel('Area')
            # plt.ylabel('Production')
            # plt.legend()
            # plt.show()
            numer = 0
            denom = 0
            for j in range(t):
                numer += (X[j] - mean_x) * (Y[j] - mean_y)
                denom += (X[j] - mean_x) ** 2
            b1 = numer / denom
            b0 = mean_y - (b1 * mean_x)
            print(b1)
            print(b0)
            slope_values.append(b1)
            # ss_t=0
            # ss_r=0
            # for k in range(t):
            #   y_pred = b0 + b1 * X[k]
            #  ss_t += (Y[k] - mean_y) ** 2
            # ss_r += (Y[k] -  y_pred) ** 2
            #r2 = 1 - (ss_r/ss_t)
            # print(r2)
            r2_score = Lin.score(X, Y)
            print(r2_score)


# In[20]:


#LR('Assam', 'Rabi')
