#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
# get_ipython().run_line_magic('matplotlib', 'inline')


# In[2]:


data = pd.read_csv(r'final.csv')
# print(data.shape)
data_state = data.State_Name.unique()
data['P/A'] = data['P/A']*1000
slope_values1 = {}
slope_values2 = {}


# In[3]:


def Prod_per_area(i, season):
    data_statei = data[data["State_Name"] == i]
    data_state_season = data_statei[data_statei['Season'] == season]
    # print(data_state_season.shape)
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
            #plt.scatter(training_x,training_y, color='green',  label='Scatter Plot')
            #plt.plot(training_x,Lin.predict(training_x),color='blue', label='regression Line')
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
            # print(b1)
            slope_values1[crop] = b1


# In[4]:


def Prod_per_fert(i, season):
    data_statei = data[data["State_Name"] == i]
    data_state_season = data_statei[data_statei['Season'] == season]
    # print(data_state_season.shape)
    data_state_season_crop = data_state_season.Crop.unique()
    data_state_season_cropnumber = data_state_season.Crop.nunique()
    if(data_state_season_cropnumber == 2):
        print('Crops =' + data_state_season_crop)
        return
    else:
        for crop in data_state_season_crop:
            crop_values = data_state_season[data_state_season['Crop'] == crop]
            X = crop_values['P/A'].values
            Y = crop_values['Fertiliser(kg/hectare)'].values
            X = X.reshape(-1, 1)  # Area
            Y = Y.reshape(-1, 1)  # Production
            mean_x = np.mean(X)
            mean_y = np.mean(Y)
            t = len(X)
            training_x, testing_x, training_y, testing_y = train_test_split(
                X, Y, test_size=0.3, random_state=0)
            Lin = LinearRegression()
            Lin.fit(training_x, training_y)
            #plt.scatter(training_x,training_y, color='green',  label='Scatter Plot')
            #plt.plot(training_x,Lin.predict(training_x),color='blue', label='regression Line')
            # plt.title(crop)
            # plt.xlabel('Yield')
            # plt.ylabel('Fertiliser(kg/hectare)')
            # plt.legend()
            # plt.show()
            numer = 0
            denom = 0
            for j in range(t):
                numer += (X[j] - mean_x) * (Y[j] - mean_y)
                denom += (X[j] - mean_x) ** 2
            b1 = numer / denom
            b0 = mean_y - (b1 * mean_x)
            # print(b1)
            # print(b0)
            slope_values2[crop] = b1
            r2_score = Lin.score(X, Y)
            # print(r2_score)


# In[5]:


def getting_optimum(slope_values1, slope_values2):
    slope_values1_sorted = sorted(
        slope_values1.items(), key=lambda x: x[1], reverse=True)
    slope_values2_sorted = sorted(slope_values2.items(), key=lambda x: x[1])
    slope_values1_sorted = dict(slope_values1_sorted)
    slope_values2_sorted = dict(slope_values2_sorted)
    list_values1_crops_sorted = list(slope_values1_sorted.keys())
    list_values2_crops_sorted = list(slope_values2_sorted.keys())
    # print(list_values2_crops_sorted)
    count = []
    for i in range(len(list_values1_crops_sorted)):
        for j in range(len(list_values2_crops_sorted)):
            if(list_values1_crops_sorted[i] == list_values2_crops_sorted[j]):
                index_added = i+j
                count.append(index_added)
    count_min = min(count)
    # print(count_min)
    result = []
    result_dict = {}
    # print(count)
    #print( list_values1_crops_sorted)
    for i in range(len(count)):
        if(count[i] == count_min):
            result.append(list_values1_crops_sorted[i])
    result_dict['Output'] = result
    return result_dict


# In[7]:


# Prod_per_area('Assam', 'Kharif')
# Prod_per_fert('Assam', 'Kharif')
# output = getting_optimum(slope_values1, slope_values2)
# print(output)
