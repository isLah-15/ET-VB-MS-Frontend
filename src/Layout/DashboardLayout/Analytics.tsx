import React from 'react';
import {
  useGetTotalRevenueQuery,
  useGetTotalBookingsQuery,
  useGetTopEventsQuery,
  useGetTotalUsersQuery,
  useGetBookingStatusStatsQuery,
  useGetPaymentMethodStatsQuery,
} from '../../Features/Analytics/AnalyticsAPI';
import {
  FaDollarSign,
  FaCalendarCheck,
  FaUsers,
  FaChartPie,
  FaCreditCard,
  FaTrophy,
  FaSpinner,
  FaExclamationTriangle,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from 'react-icons/fa';

const Analytics = () => {
  // RTK Query hooks
  const { data: totalRevenue, isLoading: revenueLoading, error: revenueError } = useGetTotalRevenueQuery();
  const { data: totalBookings, isLoading: bookingsLoading, error: bookingsError } = useGetTotalBookingsQuery();
  const { data: topEvents, isLoading: eventsLoading, error: eventsError } = useGetTopEventsQuery();
  const { data: totalUsers, isLoading: usersLoading, error: usersError } = useGetTotalUsersQuery();
  const { data: bookingStats, isLoading: bookingStatsLoading, error: bookingStatsError } = useGetBookingStatusStatsQuery();
  const { data: paymentStats, isLoading: paymentStatsLoading, error: paymentStatsError } = useGetPaymentMethodStatsQuery();

  // Loading component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-20">
      <FaSpinner className="animate-spin text-yellow-400 text-2xl" />
    </div>
  );

  // Error component
  const ErrorMessage = ({ message }: { message: string }) => (
    <div className="flex items-center justify-center h-20 text-red-400">
      <FaExclamationTriangle className="mr-2" />
      <span className="text-sm">{message}</span>
    </div>
  );

  // Stats Card Component
  const StatsCard = ({ 
    title, 
    value, 
    icon: Icon, 
    isLoading, 
    error, 
    trend,
    trendValue 
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    isLoading: boolean;
    error: any;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
  }) => (
    <div className="group relative p-6 bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 backdrop-blur-sm rounded-xl border border-yellow-700/20 hover:border-yellow-500/40 shadow-lg hover:shadow-xl hover:shadow-yellow-500/10 transition-all duration-300">
      {/* Background glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-yellow-500/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 rounded-xl border border-yellow-600/20 group-hover:border-yellow-500/40 transition-all duration-300">
            <Icon className="text-yellow-400 text-xl group-hover:text-yellow-300 transition-colors duration-300" />
          </div>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
              trend === 'up' ? 'bg-green-500/20 text-green-400' :
              trend === 'down' ? 'bg-red-500/20 text-red-400' :
              'bg-zinc-500/20 text-zinc-400'
            }`}>
              {trend === 'up' ? <FaArrowUp /> : trend === 'down' ? <FaArrowDown /> : null}
              {trendValue}
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-zinc-400 group-hover:text-zinc-300 transition-colors duration-300 uppercase tracking-wide">
            {title}
          </h3>
          
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <ErrorMessage message="Failed to load" />
          ) : (
            <div className="text-3xl font-bold text-amber-100 group-hover:text-yellow-100 transition-colors duration-300">
              {typeof value === 'number' ? value.toLocaleString() : value}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-xl border border-yellow-500/30">
            <FaChartLine className="text-yellow-400 text-2xl" />
          </div>
          <h1 className="text-3xl font-bold text-amber-100 tracking-wide">Analytics Dashboard</h1>
        </div>
        <p className="text-zinc-400 text-lg ml-16">Comprehensive overview of your platform performance</p>
        <div className="absolute -bottom-2 left-16 w-32 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={totalRevenue ? `$${totalRevenue.toLocaleString()}` : 0}
          icon={FaDollarSign}
          isLoading={revenueLoading}
          error={revenueError}
          trend="up"
          trendValue="+12.5%"
        />
        
        <StatsCard
          title="Total Bookings"
          value={totalBookings || 0}
          icon={FaCalendarCheck}
          isLoading={bookingsLoading}
          error={bookingsError}
          trend="up"
          trendValue="+8.3%"
        />
        
        <StatsCard
          title="Total Users"
          value={totalUsers || 0}
          icon={FaUsers}
          isLoading={usersLoading}
          error={usersError}
          trend="up"
          trendValue="+15.7%"
        />
        
        <StatsCard
          title="Active Events"
          value={topEvents ? topEvents.length : 0}
          icon={FaTrophy}
          isLoading={eventsLoading}
          error={eventsError}
          trend="neutral"
          trendValue="Stable"
        />
      </div>

      {/* Charts and Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Events */}
        <div className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 backdrop-blur-sm rounded-xl border border-yellow-700/20 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 rounded-lg border border-yellow-600/20">
              <FaTrophy className="text-yellow-400 text-lg" />
            </div>
            <h2 className="text-xl font-bold text-amber-100">Top Performing Events</h2>
          </div>
          
          {eventsLoading ? (
            <LoadingSpinner />
          ) : eventsError ? (
            <ErrorMessage message="Failed to load events data" />
          ) : (
            <div className="space-y-4">
              {topEvents?.map((event, index) => (
                <div key={event.eventId} className="flex items-center justify-between p-4 bg-zinc-800/40 rounded-lg border border-zinc-700/50 hover:border-yellow-600/30 transition-colors duration-300">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                      index === 1 ? 'bg-zinc-500/20 text-zinc-400' :
                      'bg-amber-600/20 text-amber-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">{event.eventName}</p>
                      <p className="text-sm text-zinc-400">Event ID: {event.eventId}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-yellow-400">{event.ticketsSold}</p>
                    <p className="text-xs text-zinc-400">tickets sold</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Booking Status Stats */}
        <div className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 backdrop-blur-sm rounded-xl border border-yellow-700/20 p-6 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 rounded-lg border border-yellow-600/20">
              <FaChartPie className="text-yellow-400 text-lg" />
            </div>
            <h2 className="text-xl font-bold text-amber-100">Booking Status</h2>
          </div>
          
          {bookingStatsLoading ? (
            <LoadingSpinner />
          ) : bookingStatsError ? (
            <ErrorMessage message="Failed to load booking stats" />
          ) : (
            <div className="space-y-3">
              {bookingStats?.map((stat, index) => {
                const total = bookingStats.reduce((sum, item) => sum + item.count, 0);
                const percentage = total > 0 ? ((stat.count / total) * 100).toFixed(1) : '0';
                
                return (
                  <div key={stat.status} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-amber-100 font-medium capitalize">{stat.status}</span>
                      <span className="text-yellow-400 font-bold">{stat.count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-zinc-700/50 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-500 ${
                          index % 4 === 0 ? 'bg-green-500' :
                          index % 4 === 1 ? 'bg-yellow-500' :
                          index % 4 === 2 ? 'bg-blue-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Payment Methods */}
        <div className="bg-gradient-to-br from-zinc-800/60 to-zinc-900/80 backdrop-blur-sm rounded-xl border border-yellow-700/20 p-6 shadow-lg lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-zinc-700/60 to-zinc-800/60 rounded-lg border border-yellow-600/20">
              <FaCreditCard className="text-yellow-400 text-lg" />
            </div>
            <h2 className="text-xl font-bold text-amber-100">Payment Methods</h2>
          </div>
          
          {paymentStatsLoading ? (
            <LoadingSpinner />
          ) : paymentStatsError ? (
            <ErrorMessage message="Failed to load payment stats" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paymentStats?.map((method, index) => {
                const total = paymentStats.reduce((sum, item) => sum + item.count, 0);
                const percentage = total > 0 ? ((method.count / total) * 100).toFixed(1) : '0';
                
                return (
                  <div key={method.method} className="p-4 bg-zinc-800/40 rounded-lg border border-zinc-700/50 hover:border-yellow-600/30 transition-colors duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-amber-100 capitalize">{method.method}</h3>
                      <div className={`p-2 rounded-lg ${
                        index % 3 === 0 ? 'bg-blue-500/20 text-blue-400' :
                        index % 3 === 1 ? 'bg-green-500/20 text-green-400' :
                        'bg-purple-500/20 text-purple-400'
                      }`}>
                        <FaCreditCard className="text-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-zinc-400 text-sm">Usage</span>
                        <span className="text-yellow-400 font-bold">{method.count}</span>
                      </div>
                      <div className="w-full bg-zinc-700/50 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            index % 3 === 0 ? 'bg-blue-500' :
                            index % 3 === 1 ? 'bg-green-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-zinc-400 text-right">{percentage}% of total</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;