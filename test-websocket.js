#!/usr/bin/env node

// Simple WebSocket connection test for Paxform
const { io } = require('socket.io-client');

console.log('🔌 Testing WebSocket connection to Paxform backend...');

const socket = io('https://datascrapex-job3-1070255625225.us-central1.run.app/appointments', {
  transports: ['websocket'],
  timeout: 5000
});

let connected = false;

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

socket.on('initial-data', (data) => {
  console.log('📊 Received initial data:', data.type);
  console.log(`📋 Appointments count: ${data.appointments?.length || 0}`);
});

socket.on('appointment-updated', (data) => {
  console.log('🔄 Appointment update received:', data.type);
});

socket.on('system-update', (data) => {
  console.log('🔧 System update:', data.status, data.type);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 WebSocket disconnected:', reason);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error.message);
});

// Send a ping after 2 seconds
setTimeout(() => {
  if (connected) {
    console.log('🏓 Sending ping...');
    socket.emit('ping');
  }
}, 2000);

// Disconnect after 5 seconds
setTimeout(() => {
  console.log('👋 Disconnecting...');
  socket.disconnect();
  process.exit(0);
}, 5000);

console.log('⏳ Waiting for connection...');