#!/usr/bin/env python
# coding: utf-8

# In[36]:


import pandas as pd
#from sklearn.model_selection import train_test_split
from sklearn import preprocessing
from sklearn import metrics
from sklearn.ensemble import RandomForestClassifier


# In[37]:


data = pd.read_csv('final.csv')
output = {}


# In[38]:


def labelEncoder(data):
    newparameter = ['precipitation', 'temperature', 'Fertiliser(kg/hectare)']
    le = preprocessing.LabelEncoder()
    for i in newparameter:
        data[i] = le.fit_transform(data[i])
    return data


def encode(data):
    dic = dict()
    for i, en in enumerate(data.Crop.unique()):
        dic[en] = i
    for key, val in dic.items():
        data = data.replace(to_replace=key, value=val)
    dta = labelEncoder(data)
    return dta, dic


def decode(data, encodes):
    crop = list(encodes.keys())[list(encodes.values()).index(data[0])]
    return crop


# In[39]:


def recommendation(district, season, fert):
    newdata = data[(data['District_Name'] == district)
                   & (data['Season'] == season)]
    newdata = newdata[['Fertiliser(kg/hectare)',
                       'precipitation', 'temperature', 'Crop']]
    sdata, encodes = encode(newdata)

    # Random forest classifier
    model = RandomForestClassifier(n_estimators=300)
    model.fit(sdata[['Fertiliser(kg/hectare)', 'precipitation',
                     'temperature']], sdata[['Crop']].values.ravel())

    # prediction

    # get prep and temp value from api
    prep = '12'
    temp = '24'

    predictData = [[fert, prep, temp]]
    pred = model.predict(predictData)
    result = []
    result.append(decode(pred, encodes))
    output['Output'] = result
    return output


# In[40]:


# ('district', 'season', 'P/A', 'Fertiliser(kg/hectare)')
# recommendation('ARARIA', 'Kharif', '0')


# In[ ]:
