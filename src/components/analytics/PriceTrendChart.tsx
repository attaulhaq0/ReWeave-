import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const data = [
  { month: 'Jan', cotton: 45, denim: 55, poly: 30 },
  { month: 'Feb', cotton: 48, denim: 52, poly: 32 },
  { month: 'Mar', cotton: 52, denim: 58, poly: 31 },
  { month: 'Apr', cotton: 50, denim: 60, poly: 35 },
  { month: 'May', cotton: 55, denim: 65, poly: 38 },
  { month: 'Jun', cotton: 60, denim: 68, poly: 40 },
];

export function PriceTrendChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-brand-primary">Price Trends (PKR/kg)</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Legend verticalAlign="top" height={36} iconType="circle" />
            <Line type="monotone" dataKey="cotton" name="Cotton Grade A" stroke="#1E3A5F" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="denim" name="Denim Offcuts" stroke="#0D9488" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="poly" name="Polyester" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
