// Real-time appointment updates test
import { io } from 'socket.io-client';

console.log('🔄 Testing real-time appointment status updates...');

const socket = io('https://datascrapex-job3-1070255625225.us-central1.run.app/appointments', {
  transports: ['websocket'],
  timeout: 5000
});

let connected = false;
let updatesReceived = [];

socket.on('connect', () => {
  connected = true;
  console.log('✅ WebSocket connected successfully!');
  console.log(`📡 Socket ID: ${socket.id}`);
  
  // Subscribe to appointment updates
  socket.emit('subscribe-appointments');
  console.log('📡 Subscribed to appointment updates');
});

socket.on('subscription-confirmed', (data) => {
  console.log('✅ Subscription confirmed:', data.message);
});

socket.on('appointment-updated', (data) => {
  console.log('🔄 Appointment update received:', data.type);
  updatesReceived.push({
    type: data.type,
    timestamp: new Date().toISOString(),
    appointmentId: data.appointment?.id
  });
  
  if (data.type === 'status-changed') {
    console.log(`📊 Status change: ${data.oldStatus} → ${data.newStatus}`);
  }
});

socket.on('system-update', (data) => {
  console.log('🔧 System update:', data.status, data.type);
  updatesReceived.push({
    type: `system-${data.status}`,
    timestamp: new Date().toISOString()
  });
});

socket.on('disconnect', (reason) => {
  console.log('🔌 WebSocket disconnected:', reason);
  console.log(`📊 Total updates received: ${updatesReceived.length}`);
  console.log('📋 Updates:', updatesReceived);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

// Listen for 10 seconds and then test the sync endpoint
setTimeout(() => {
  console.log('🔄 Triggering manual sync to test real-time updates...');
  fetch('https://datascrapex-job3-1070255625225.us-central1.run.app/api/calendar/sync', { method: 'POST' });
}, 3000);

// Listen for updates and then disconnect
setTimeout(() => {
  console.log('👋 Test completed. Summary:');
  console.log(`📊 Total updates received: ${updatesReceived.length}`);
  if (updatesReceived.length > 0) {
    console.log('✅ Real-time updates are working!');
  } else {
    console.log('ℹ️ No updates received (expected if no appointment changes)');
  }
  
  socket.disconnect();
  process.exit(0);
}, 10000);

console.log('⏳ Waiting for real-time updates...');