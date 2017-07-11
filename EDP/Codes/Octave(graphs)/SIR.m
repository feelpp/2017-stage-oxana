beta=0.001,v=0.1;
options = odeset ('RelTol',1e-4,'AbsTol',1e-4);
[T,Y] = ode45(@fonction,[0 60],[500 1 0],options,beta,v);
plot(T,Y(:,1),'--',T,Y(:,2),'--',T,Y(:,3),'--')
title ('Dynamique du modèle SIR')
legend('Susceptible','Infected','Recovered', 'Location','west')
